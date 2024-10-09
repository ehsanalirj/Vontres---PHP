import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';
import csv from 'csv-parser';
import Company from '../models/Company';
import User from '../models/User';
import Contact from '../models/Contact';

export class DataExportImportService {
  static async exportCompanyData(companyId: string): Promise<string> {
    const company = await Company.findById(companyId);
    const users = await User.find({ company: companyId });
    const contacts = await Contact.find({ company: companyId });

    const data = {
      company,
      users,
      contacts
    };

    const json = JSON.stringify(data, null, 2);
    const fileName = `company_${companyId}_export_${Date.now()}.json`;
    const filePath = path.join(__dirname, '..', '..', 'exports', fileName);

    fs.writeFileSync(filePath, json);

    return filePath;
  }

  static async importCompanyData(filePath: string): Promise<void> {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Import company
    const company = new Company(data.company);
    await company.save();

    // Import users
    for (const userData of data.users) {
      userData.company = company._id;
      const user = new User(userData);
      await user.save();
    }

    // Import contacts
    for (const contactData of data.contacts) {
      contactData.company = company._id;
      const contact = new Contact(contactData);
      await contact.save();
    }

    console.log(`Data imported successfully for company: ${company.name}`);
  }

  static async exportContactsToCSV(companyId: string): Promise<string> {
    const contacts = await Contact.find({ company: companyId });
    const fields = ['name', 'email', 'phone', 'company'];
    const parser = new Parser({ fields });
    const csv = parser.parse(contacts);

    const fileName = `contacts_export_${companyId}_${Date.now()}.csv`;
    const filePath = path.join(__dirname, '..', '..', 'exports', fileName);

    fs.writeFileSync(filePath, csv);

    return filePath;
  }

  static async importContactsFromCSV(companyId: string, filePath: string): Promise<void> {
    const contacts: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        contacts.push({
          ...row,
          company: companyId
        });
      })
      .on('end', async () => {
        await Contact.insertMany(contacts);
        console.log(`${contacts.length} contacts imported successfully`);
      });
  }
}