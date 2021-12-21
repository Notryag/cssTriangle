import React, {
    createElement,
    useEffect,
    useImperativeHandle,
    useState,
  } from 'react';
  import { Form, Input, Select, Slider, Button, Radio } from 'antd';
  import { SketchPicker } from 'react-color';
  const FormItem = Form.Item,
    h = createElement;
  interface formItem {
    type: string;
    label: string;
    name?: string;
  }
  
  interface propTypes {
    columns: any;
    data: Object;
    cRef: Object;
    onValuesChange?: any;
  }
  
  const FormComponent = ({ columns, data, cRef, onValuesChange }: propTypes) => {
    const [form] = Form.useForm();
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState('rgb(18, 15, 222)');
    //cRef就是父组件传过来的ref
    // @ts-ignore
    useImperativeHandle(cRef, () => ({
      //getForm就是暴露给父组件的方法
      getForm: () => form,
      onReset: () => onReset(),
    }));
    useEffect(() => {
      form.setFieldsValue(data);
      setColor((data as any).color);
    }, [columns]);
  
    const tailLayout = {
      wrapperCol: { offset: 4, span: 16 },
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const components = {
      radio: ({ list = [], callback = () => {} }) =>
        h(
          Radio.Group,
          { onChange: (v: any) => callback(v) },
          list.map((c: any) =>
            h(Radio, { key: c.value, value: c.value }, c.label),
          ),
        ),
      input: ({}) => <Input />,
      slider: ({ max = 100 }) => <Slider max={max}></Slider>,
    };
    const changeDisplay = () => {
      setDisplayColorPicker(!displayColorPicker);
    };
    const onColorChange = (v: string) => {
      setColor(v);
      form.setFieldsValue({ color: v });
      onValuesChange();
    };
    const onReset = () => {
      setColor((data as any).color);
      form.setFieldsValue(data);
      onValuesChange();
    };
    return (
      <Form {...layout} form={form} onValuesChange={onValuesChange}>
        {columns.map((n: formItem) => {
          const { type = 'input' } = n;
          const C = components[type];
          return (
            <FormItem label={n.label} name={n.name} key={n.name}>
              {C(n)}
            </FormItem>
          );
        })}
        <Form.Item label="颜色" name="color">
          <div>
            <div
              style={{
                height: 20,
                width: 60,
                marginTop: 10,
                backgroundColor: color,
              }}
              onClick={changeDisplay}
            ></div>
            {displayColorPicker ? (
              <>
                <div style={{ position: 'absolute', zIndex: 2000 }}>
                  <SketchPicker
                    color={color}
                    onChange={(color) => onColorChange(color.hex)}
                  />
                </div>
                <div
                  style={{ position: 'fixed', inset: '0', zIndex: 1000 }}
                  onClick={changeDisplay}
                ></div>
              </>
            ) : null}
          </div>
        </Form.Item>
        <FormItem {...tailLayout}>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  };
  
  export default FormComponent;
  