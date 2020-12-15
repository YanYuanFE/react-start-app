import React, {useState} from 'react';
import {
  Row,
  Col,
  Card,
  Tabs,
  Radio,
  DatePicker,
  Menu,
  Dropdown,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const Analysis = () => {
  const [salesType, setSalesType] = useState("all");
  const [rangePickerValue, setRangeValue] = useState();


  const handleChangeSalesType = e => {
    setSalesType(e.target.value);
  };

  const handleRangePickerChange = rangePickerValue => {
    setRangeValue(rangePickerValue);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        操作一
      </Menu.Item>
      <Menu.Item>
        操作二
      </Menu.Item>
    </Menu>
  );

  const iconGroup = (
    <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <EllipsisOutlined />
        </Dropdown>
      </span>
  );

  const salesExtra = (
    <div className={styles.salesExtraWrap}>
      <RangePicker
        value={rangePickerValue}
        onChange={handleRangePickerChange}
        style={{ width: 256 }}
      />
    </div>
  );

  return (
    <>
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.salesCard}>
          <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
            <TabPane tab="销售额" key="sales">
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    销售额
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>
                      门店销售额排名
                    </h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                          <span>
                              {item.total}
                            </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="访问量" key="views">
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    访问量
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>
                      门店访问量排名
                    </h4>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Card>

      <Row gutter={24}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            bordered={false}
            title="线上热门搜索"
            extra={iconGroup}
            style={{ marginTop: 24, minHeight: 509 }}
          >
            线上热门搜索
          </Card>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.salesCard}
            bordered={false}
            title="销售额类别占比"
            bodyStyle={{ padding: 24 }}
            extra={
              <div className={styles.salesCardExtra}>
                {iconGroup}
                <div className={styles.salesTypeRadio}>
                  <Radio.Group value={salesType} onChange={handleChangeSalesType}>
                    <Radio.Button value="all">
                      全部渠道
                    </Radio.Button>
                    <Radio.Button value="online">
                      线上
                    </Radio.Button>
                    <Radio.Button value="offline">
                      门店
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            }
            style={{ marginTop: 24, minHeight: 509 }}
          >
            <h4 style={{ marginTop: 8, marginBottom: 32 }}>
              销售额
            </h4>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Analysis;
