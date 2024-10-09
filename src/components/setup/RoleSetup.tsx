import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, List, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { addRole, removeRole } from '../../store/actions/setupActions';

const { Option } = Select;

const RoleSetup: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.setup.roles);
  const departments = useSelector((state: RootState) => state.setup.departments);

  const onFinish = (values: any) => {
    dispatch(addRole(values));
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="roleName" rules={[{ required: true, message: 'Please input role name!' }]}>
          <Input placeholder="Role Name" />
        </Form.Item>
        <Form.Item name="department" rules={[{ required: true, message: 'Please select a department!' }]}>
          <Select placeholder="Select Department">
            {departments.map(dept => (
              <Option key={dept} value={dept}>{dept}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Role
          </Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={roles}
        renderItem={item => (
          <List.Item
            actions={[<Button icon={<DeleteOutlined />} onClick={() => dispatch(removeRole(item.roleName))} />]}
          >
            <List.Item.Meta 
              title={item.roleName}
              description={`Department: ${item.department}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RoleSetup;