import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, theme, DatePicker } from "antd";
// const { RangePicker } = DatePicker;
const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    // console.log(values);
    let query = "";
    //build query
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    // console.log("check query", query);

    if (query) {
      // console.log(query);
      props.handleSearch(query);
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name={`valueData`} label={`Filter Time`}>
            <DatePicker style={{ width: 300 }} format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
