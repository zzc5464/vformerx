
const wrapper = function (value) {
    return {
        success: true,
        errorMsg: '',
        value
    }
}
const relationTypes = [
  {name: '本人', value: '00'},
  {name: '配偶', value: '01'},
  {name: '子女', value: '02'},
  {name: '父母', value: '03'},
  {name: '亲属', value: '04'},
  {name: '无关或不确定', value: '05'},
  {name: '其他', value: '06'},
  {name: '雇佣关系', value: '07'},
  {name: '兄弟', value: '08'},
  {name: '兄妹', value: '09'},
  {name: '姐弟', value: '10'},
  {name: '姐妹', value: '11'},
  {name: '祖父母', value: '12'},
  {name: '孙子女', value: '13'},
  {name: '法人', value: '14'},
  {name: '协会', value: '15'},
  {name: '会员', value: '16'},
  {name: '贷款机构', value: '17'}
]
const defaultOccupation = {
  value: '010103',
  rules: {
    label: '职业',
    type:'hidden',
    vRules: 'required',
    placeholder: '请选择',
    showName:true,
    errorMsg: '请选择投保人职业',
    options: [[
      // 默认职业
      {name:'default', value:'010103'}
    ]]
  }
}
const data = {
  page1: {
    f1: {
      name: {
        value: '',
        rules: {
          label: '姓名',
          type: 'za-input',
          vRules: 'required|username|usernameLength',
          placeholder: '请输入姓名',
          errorMsg: '请输入姓名'
        }
      },
      address : {
        value: {
          "province": "",
          "provinceDesc": "",
          "city": "",
          "cityDesc": "",
          "district": "",
          "districtDesc": "",
          "detail": ""
        },
        rules: {
          label: '地址',
          subLabel: 'detail',
          type: 'za-address',
          vRules: 'required',
          showDetail: true,
          errorMsg: '请输入如何看待寿险营销'
        }
      },
      genderCode: {
        value: 'M',
        rules: {
          label: '性别',
          type: 'za-sex',
          vRules: 'required',
          placeholder: '请选择',
          errorMsg: '请输入性别'
        }
      },
      birthday: {
        value: '1980-01-01',
        rules: {
          label: '出生日期',
          type: 'za-date',
          vRules: 'required',
          placeholder: '请选择',
          errorMsg: '请输入出生日期',
          stime:'',
          etime:'',
        }
      }
    },
    f2: {// 被保人信息
      relation: {
        value: '',
        rules: {
          label: '是投保人',
          type: 'za-select',
          vRules: 'required',
          placeholder: '请选择',
          errorMsg: '请选择与投保人的关系',
          showName: true,
          options: [relationTypes]
        }
      },
      relationFristInsure: {
        value: '',
        rules: {
          label: '是被保人',
          type: 'za-select',
          vRules: 'required',
          placeholder: '请选择',
          errorMsg: '请选择与被保人的关系',
          showName: true,
          options: [relationTypes]
        }
      },
      name: {
        value: '',
        rules: {
          label: '姓名',
          type: 'za-input',
          vRules: 'required|username|usernameLength',
          placeholder: '请输入姓名',
          errorMsg: '请输入姓名'
        }
      },
      genderCode: {
        value: 'M',
        rules: {
          label: '性别',
          type: 'za-sex',
          vRules: 'required',
          placeholder: '请选择',
          errorMsg: '请输入性别'
        }
      },
    },
    f3: {// 添加的被保人信息
      genderCode: {
        value: 'F',
        rules: {
          label: '性别',
          type: 'za-sex',
          vRules: 'required',
          placeholder: '请选择',
          errorMsg: '请输入性别'
        }
      }
    },
  }
}
// const data = [
//   {// 表单初始化数据
//     name: {
//       value: '',
//       rules: {
//         label: '姓名',
//         type: 'za-input',
//         vRules: 'required|username|usernameLength',
//         placeholder: '请输入姓名',
//         errorMsg: '请输入姓名'
//       }
//     }
//   },
//   {// 被保人信息
//     name: {
//       value: '',
//       rules: {
//         label: '姓名',
//         type: 'za-input',
//         vRules: 'required|username|usernameLength',
//         placeholder: '请输入姓名',
//         errorMsg: '请输入姓名'
//       }
//     },
//     genderCode: {
//       value: 'M',
//       rules: {
//         label: '性别',
//         type: 'za-sex',
//         vRules: 'required',
//         placeholder: '请选择',
//         errorMsg: '请输入性别'
//       }
//     },
//   },
//   {// 添加的被保人信息
//     genderCode: {
//       value: 'F',
//       rules: {
//         label: '性别',
//         type: 'za-sex',
//         vRules: 'required',
//         placeholder: '请选择',
//         errorMsg: '请输入性别'
//       }
//     }
//   },
// ]
module.exports = payload => wrapper(data)