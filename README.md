# vsiren-cli
> A Vue.js project Multiple Entry

## 目录结构说明

- 路由按目录划分，即每个页面对应一个文件夹，每个文件夹包含 index.js,
  main.vue。具体请参考demo
- 路由名称和文件夹保持一致(重要)
- 全面弃用sass. sass对平台的一致性要求太高，node版本不一致或者`npm install` 都会导致node-sass需要重新编译。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8100
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run createEntry
npm run createEntry target

# run mdev    run dev & mock
npm run mdev

# run all tests
npm test
```

## API MOCK

API : src/api/index.js

``` bash
export const I_HEALTHINFORM = path(healthInform)

export const I_HEALTHINFORM = path(healthInform， true)

true : local mock   mock data from service/mock

false: origin mock

open snap  dir path = service/snap

server/server.js  config origin host

example

var crosshost = 'https://easy-mock.com'

```

## formModel返回数据说明

| 类型            | 返回值 | 备注       |
| --------------- | ------ | ---------- |
| za-select       | String |            |
| za-input        | String |            |
| za-button_group | String |            |
| hidden          | String |            |
| za-text         | String | 值无法修改 |
| za-address      | Object |            |
| za-date         | String |            |
| za-sex          | String |            |
| za-yesno        | String |            |
| za-textarea     | String |            |
| Title           |        | 无返回值   |

## formModel配置说明

```js
{
    p1: { // 页面标识
        form1: {// 表单标识
            demo1: {// fields
                value: '',
                rules: {
                  ...
                },
                validators:[// 校验规则 支持多个
                    {
                        fields:[...],//校验对象, 支持多个
                        codes: `String`,//校验代码，字符串
                        
                    }  
                ],
                fillers:[] // 回写方法,暂未实现
            }
        }
    }
}
```

- **DEMO**

```js
export const formModels = {
    p1: {
        'form1': {
            relation: {
                value: '',
                rules: {
                  label: 'certType',
                  type: 'za-select',
                  vRules: 'required',
                  placeholder: '请选择',
                  showName: true,
                  errorMsg: '请选择',
                  options: [
                    [
                        {value: 'self',name: '本人'},
                        {value: 'sexPartner', name: '情侣'},
                        {value: 'else', name: '其他'}
                    ]
                    ]
                }
            },
            sex1: {
                value: '',
                rules: {
                    label: 'sex1',
                    type: 'za-sex',
                    vRules: 'required',
                    placeholder: '请选择',
                    errorMsg: '请选择性别',
                },
                validators: [
                    {
                        fields: ['p1-form1-relation','p1-form1-sex2'],
                        codes: `
                        if (!$$(1)) {
                        return $$.fail(0, '请选择关系') 
                        }
                        if($$(1) == 'sexPartner' && $$(0) == $$(2)) {
                        return $$.fail(0, '性别相同，如何恋爱') 
                        }
                        if($$(1) == 'self' && $$(0) != $$(2)) {
                        return $$.fail(0, '性别必须相同') 
                        }
                        return $$.pass()
                        `
                    }
                ],
            },
            sex2: {
                value: '',
                rules: {
                    label: 'sex2',
                    type: 'za-sex',
                    vRules: 'required',
                    placeholder: '请选择',
                    errorMsg: '请选择性别',
                }
            },
            
        },
    }
}
```

