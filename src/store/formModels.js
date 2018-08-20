export const formModels = {
    templates: {        
        'Equals': `
            let ret = false
            switch ($$.type()) {
                case 'number': 
                    ret = parseInt($$(0)) === parseInt($$(1))
                    break
                case 'date':
                    let d1 = new Date($$(0))
                    let d2 = new Date($$(1))
                    ret = d1.getTime() === d2.getTime()
                    break
                case 'string':
                    ret = $$(0) === $$(1)
                    break
                case 'address':
                    ret = false
                    break;
            }

            return ret ? $$.pass() : $$.fail(0, '必须相等于')
        `,

        'GreaterThan': `
            if ($$(0).equals($$(1)) {
                return $$.pass();
            } else {
                return $$.fail(0, '必须大于')
            }
        `
    },
    // dependencies: {
    //     'p2-form1-tax': [
    //         {
    //             name: 'p1-form1-income',
    //             validator: 'GreaterThan'
    //         }
    //     ]
    // },
    p1: {
        'form1': {
            income: {
                name: '父母年龄',
                value: '',
                type: 'string', // number / date / string / address
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
                    // {
                    //     name: '验证父母年龄',
                    //     fields: ['p2-form1-tax'],
                    //     codes: `
                    //       console.log($$.type(0));
                    //       console.log($$.type(1));
                    //       if ($$.number(0) > $$.number(1)) {
                    //           return $$.pass()
                    //       } else {
                    //           return $$.fail(0, '父母的年龄小于子女的年龄') 
                    //       }`
                    // },
                    {
                        name: 'GreaterThan', 
                        fields: ['p2-form1-tax'],
                        template: 'Equals'
                    }
                ],
                fillers: []
            },
            income2: {
                value: '',
                rules: {
                    label: 'Income2',
                    type: 'za-input',
                    vRules: 'required|min:1|max:8',
                    placeholder: '请输入',
                    errorMsg: '请输入如何看待寿险营销',
                    extra: {
                        text: '万元'
                    }
                }
            }
        },
        'form2': {
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
                }
            }
        }
    },
    p2: {
        'form1': {
            tax: {
                value: '',
                type: 'numbers',
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