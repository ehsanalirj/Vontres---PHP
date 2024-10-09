import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Button, Tree } from 'antd';
import { saveHierarchy } from '../../store/actions/setupActions';

const { Option } = Select;

const HierarchySetup: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.setup.roles);
  const hierarchy = useSelector((state: RootState) => state.setup.hierarchy);

  const onFinish = (values: any) => {
    dispatch(saveHierarchy(values));
  };

  const renderTreeNodes = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.roleName} key={item.roleName}>
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.roleName} key={item.roleName} />;
    });
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select a role">
            {roles.map(role => (
              <Option key={role.roleName} value={role.roleName}>{role.roleName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="reportsTo" label="Reports To">
          <Select placeholder="Select a role">
            {roles.map(role => (
              <Option key={role.roleName} value={role.roleName}>{role.roleName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add to Hierarchy</Button>
        </Form.Item>
      </Form>
      <Tree>{renderTreeNodes(hierarchy)}</Tree>
    </div>
  );
};

export default HierarchySetup;