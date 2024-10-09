import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../services/adminService';

interface Company {
  id: string;
  name: string;
  email: string;
  plan: string;
}

const AdminPanel: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const fetchedCompanies = await getCompanies();
    setCompanies(fetchedCompanies);
  };

  const showModal = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      form.setFieldsValue(company);
    } else {
      setEditingCompany(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCompany) {
        await updateCompany(editingCompany.id, values);
      } else {
        await createCompany(values);
      }
      setIsModalVisible(false);
      fetchCompanies();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCompany(id);
    fetchCompanies();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Company) => (
        <span>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Company Management</h2>
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        Add Company
      </Button>
      <Table columns={columns} dataSource={companies} rowKey="id" />
      <Modal
        title={editingCompany ? "Edit Company" : "Add Company"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="plan" label="Plan" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;