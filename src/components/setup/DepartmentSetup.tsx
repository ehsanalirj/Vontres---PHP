import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, List } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { addDepartment, removeDepartment } from '../../store/actions/setupActions';

const DepartmentSetup: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const departments = useSelector((state: RootState) => state.setup.departments);

  const onFinish = (values: any) => {
    dispatch(addDepartment(values.departmentName));
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="departmentName" rules={[{ required: true, message: 'Please input department name!' }]}>
          <Input placeholder="Department Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Department
          </Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={departments}
        renderItem={item => (
          <List.Item
            actions={[<Button icon={<DeleteOutlined />} onClick={() => dispatch(removeDepartment(item))} />]}
          >
            <List.Item.Meta title={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default DepartmentSetup;