export const formModels = {
    p1: {
        form1: {
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
        form2: {
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
        form1: {
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
        form1: {
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