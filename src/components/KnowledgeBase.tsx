import React, { useState, useEffect } from 'react';
import { Input, Tree, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKnowledgeBase, searchKnowledgeBase } from '../store/actions/knowledgeBaseActions';

const { Search } = Input;

const KnowledgeBase: React.FC = () => {
  const dispatch = useDispatch();
  const knowledgeBase = useSelector((state: RootState) => state.knowledgeBase.data);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    dispatch(fetchKnowledgeBase());
  }, [dispatch]);

  const onSearch = (value: string) => {
    const results = dispatch(searchKnowledgeBase(value));
    setSearchResults(results);
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    setSelectedArticle(info.node);
  };

  return (
    <div>
      <h2>Knowledge Base</h2>
      <Search placeholder="Search knowledge base" onSearch={onSearch} style={{ marginBottom: 16 }} />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', marginRight: 16 }}>
          <Tree
            treeData={knowledgeBase}
            onSelect={onSelect}
          />
        </div>
        <div style={{ width: '70%' }}>
          {selectedArticle ? (
            <Card title={selectedArticle.title}>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            </Card>
          ) : (
            <p>Select an article to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;