import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, List } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { addScript, removeScript } from '../../store/actions/setupActions';

const { TextArea } = Input;

const ScriptingSetup: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const scripts = useSelector((state: RootState) => state.setup.scripts);

  const onFinish = (values: any) => {
    dispatch(addScript(values));
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="scriptName" label="Script Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="scriptContent" label="Script Content" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Script
          </Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={scripts}
        renderItem={item => (
          <List.Item
            actions={[<Button icon={<DeleteOutlined />} onClick={() => dispatch(removeScript(item.scriptName))} />]}
          >
            <List.Item.Meta
              title={item.scriptName}
              description={item.scriptContent.substring(0, 100) + '...'}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ScriptingSetup;