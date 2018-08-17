export const formModels = {
    p1: {
        'form1': {
            income: {
                value: '',
                rules: {
                    label: 'Income',
                    type: 'za-input',
                    vRules: 'required|min:1|max:8',
                    placeholder: '请输入',
                    errorMsg: '请输入如何看待寿险营销',
                    extra: {
                        text: '万元'
                    }
                },
                validators: [
                    {
                        name: '验证父母年龄',
                        fields: ['p2-form1-tax'],
                        codes: `
                          if ($$.number(0) > $$.number(1)) {
                              return $$.pass()
                          } else {
                              return $$.fail(0, '父母的年龄小于子女的年龄') 
                          }`
                    }
                ],
            },
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
        // 'form2': {
        //     income: {
        //         value: '',
        //         rules: {
        //             label: 'Income',
        //             type: 'za-input',
        //             vRules: 'required|min:1|max:8',
        //             placeholder: '请输入',
        //             errorMsg: '请输入如何看待寿险营销',
        //             extra: {
        //                 text: '万元'
        //             }
        //         }
        //     }
        // }
    },
    p2: {
        'form1': {
            tax: {
                value: '',
                rules: {
                    label: 'Tax',
                    type: 'za-input',
                    vRules: 'required|min:1|max:8',
                    placeholder: '请输入',
                    errorMsg: '请输入如何看待寿险营销',
                    extra: {
                        text: '万元'
                    }
                }
            }
        }
    },
    p3: {
        'form1': {
            other: {
                value: '',
                rules: {
                    label: 'Others',
                    type: 'za-input',
                    vRules: 'required|min:1|max:8',
                    placeholder: '请输入',
                    errorMsg: '请输入如何看待寿险营销',
                    extra: {
                        text: '万元'
                    }
                }
            }
        }
    }
}