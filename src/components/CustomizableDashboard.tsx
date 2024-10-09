import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const availableWidgets = {
  callVolume: { title: 'Call Volume', component: CallVolumeWidget },
  agentPerformance: { title: 'Agent Performance', component: AgentPerformanceWidget },
  customerSatisfaction: { title: 'Customer Satisfaction', component: CustomerSatisfactionWidget },
  // Add more widgets as needed
};

const CustomizableDashboard: React.FC = () => {
  const [widgets, setWidgets] = useState(['callVolume', 'agentPerformance']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newWidgets = Array.from(widgets);
    const [reorderedItem] = newWidgets.splice(result.source.index, 1);
    newWidgets.splice(result.destination.index, 0, reorderedItem);
    setWidgets(newWidgets);
  };

  const addWidget = (widgetKey) => {
    setWidgets([...widgets, widgetKey]);
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add Widget</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {widgets.map((widgetKey, index) => (
                <Draggable key={widgetKey} draggableId={widgetKey} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card title={availableWidgets[widgetKey].title} style={{ margin: '16px 0' }}>
                        {React.createElement(availableWidgets[widgetKey].component)}
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Modal
        title="Add Widget"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {Object.entries(availableWidgets).map(([key, widget]) => (
          <Button key={key} onClick={() => addWidget(key)} style={{ margin: '8px' }}>
            {widget.title}
          </Button>
        ))}
      </Modal>
    </div>
  );
};

export default CustomizableDashboard;