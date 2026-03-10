import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Slider } from 'antd';
import { SketchPicker } from 'react-color';
import { FormColumn, ShapeValues } from '@/config';

const FormItem = Form.Item;

interface FormComponentProps {
  columns: FormColumn[];
  data: ShapeValues;
  onValuesChange?: (values: ShapeValues) => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const renderField = (column: FormColumn) => {
  switch (column.type) {
    case 'radio':
      return (
        <Radio.Group>
          {column.list.map((item) => (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case 'slider':
      return <Slider max={column.max ?? 100} />;
    case 'input':
    default:
      return <Input />;
  }
};

const FormComponent = ({
  columns,
  data,
  onValuesChange,
}: FormComponentProps) => {
  const [form] = Form.useForm<ShapeValues>();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(data.color);

  useEffect(() => {
    form.setFieldsValue(data);
    setColor(data.color);
    setDisplayColorPicker(false);
  }, [data, form]);

  const handleFormValuesChange = (_changedValues: ShapeValues, allValues: ShapeValues) => {
    onValuesChange?.(allValues);
  };

  const handleColorChange = (nextColor: string) => {
    setColor(nextColor);
    const nextValues = {
      ...form.getFieldsValue(),
      color: nextColor,
    } as ShapeValues;
    form.setFieldsValue({ color: nextColor });
    onValuesChange?.(nextValues);
  };

  const handleReset = () => {
    setColor(data.color);
    form.setFieldsValue(data);
    onValuesChange?.(data);
  };

  return (
    <Form
      {...layout}
      form={form}
      initialValues={data}
      onValuesChange={handleFormValuesChange}
    >
      {columns.map((column) => (
        <FormItem label={column.label} name={column.name} key={column.name}>
          {renderField(column)}
        </FormItem>
      ))}
      <FormItem label="颜色" name="color">
        <div>
          <div
            style={{
              height: 20,
              width: 60,
              marginTop: 10,
              backgroundColor: color,
            }}
            onClick={() => setDisplayColorPicker((visible) => !visible)}
          ></div>
          {displayColorPicker ? (
            <>
              <div style={{ position: 'absolute', zIndex: 2000 }}>
                <SketchPicker
                  color={color}
                  onChange={(nextColor) => handleColorChange(nextColor.hex)}
                />
              </div>
              <div
                style={{ position: 'fixed', inset: '0', zIndex: 1000 }}
                onClick={() => setDisplayColorPicker(false)}
              ></div>
            </>
          ) : null}
        </div>
      </FormItem>
      <FormItem {...tailLayout}>
        <Button htmlType="button" onClick={handleReset}>
          重置
        </Button>
      </FormItem>
    </Form>
  );
};

export default FormComponent;
  
