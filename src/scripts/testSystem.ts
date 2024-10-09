import axios from 'axios';

async function testSystem() {
  const baseURL = 'http://localhost:3000/api'; // Adjust this to your actual API URL
  let adminToken, companyToken, agentToken;

  try {
    // Admin login
    const adminLogin = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@vontres.ai',
      password: 'adminpassword',
    });
    adminToken = adminLogin.data.token;
    console.log('Admin logged in successfully');

    // Company login
    const companyLogin = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@democompany.com', // Assuming the company admin uses this email
      password: 'adminpassword',
    });
    companyToken = companyLogin.data.token;
    console.log('Company logged in successfully');

    // Agent login
    const agentLogin = await axios.post(`${baseURL}/auth/login`, {
      email: 'agent@democompany.com',
      password: 'agentpassword',
    });
    agentToken = agentLogin.data.token;
    console.log('Agent logged in successfully');

    // Test admin functionalities
    const companies = await axios.get(`${baseURL}/admin/companies`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`Admin can see ${companies.data.length} companies`);

    // Test company functionalities
    const agents = await axios.get(`${baseURL}/company/agents`, {
      headers: { Authorization: `Bearer ${companyToken}` },
    });
    console.log(`Company can see ${agents.data.length} agents`);

    // Test agent functionalities
    const dialerConfig = await axios.get(`${baseURL}/agent/dialer-config`, {
      headers: { Authorization: `Bearer ${agentToken}` },
    });
    console.log('Agent can access dialer configuration');

    // Test making a call (simulated)
    const call = await axios.post(
      `${baseURL}/agent/make-call`,
      { phoneNumber: '+15551234567' },
      { headers: { Authorization: `Bearer ${agentToken}` } }
    );
    console.log('Agent initiated a call');

    // Test creating a ticket
    const ticket = await axios.post(
      `${baseURL}/agent/create-ticket`,
      { title: 'Test Ticket', description: 'This is a test ticket' },
      { headers: { Authorization: `Bearer ${agentToken}` } }
    );
    console.log('Agent created a ticket');

    console.log('All tests passed successfully');
  } catch (error) {
    console.error('Error during system test:', error.response?.data || error.message);
  }
}

testSystem();