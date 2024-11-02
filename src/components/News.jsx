import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Crypto'); // Default to Crypto
  const { data: cryptoData } = useGetCryptosQuery(100); // Fetch cryptocurrency data
  const { data: cryptoNews, error, refetch } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  useEffect(() => {
    refetch(); // Fetch latest news whenever the category changes
  }, [newsCategory, refetch]);

  // Error handling for fetching news
  if (error) {
    console.error("Error fetching news data:", error);
    return <div>Error fetching news. Please try again later.</div>;
  }

  // Loading state
  if (!cryptoNews?.articles) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            value={newsCategory} // Set the selected value
            placeholder="Select a Category"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Crypto">Crypto News</Option>
            {cryptoData?.data?.coins?.map((currency) => (
              <Option key={currency.uuid} value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news.urlToImage || demoImage} alt="news" style={{ maxWidth: '100%', maxHeight: '100px' }} />
              </div>
              <p>{news.description?.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.source?.name ? demoImage : demoImage} alt="provider" />
                  <Text className="provider-name">{news.source?.name}</Text>
                </div>
                <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
