const wrapper = function (value) {
  return {
      success: true,
      errorMsg: '',
      value
  }
}

const formModels = {
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
  p1: {
		form1: {
			name: {
						name: '父母年龄',
						value: '',
						type: 'string', // number / date / string / address
						rules: {
								label: '姓名',
								type: 'za-input',
								vRules: 'required|username|usernameLength',
								placeholder: '请输入姓名',
								errorMsg: '请输入姓名',
						},
						validators: [
								// {
								//     name: '姓名',
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
				},
			genderCode: {
					value: 'M',
					rules: {
							label: '性别',
							type: 'za-sex',
							vRules: 'required',
							placeholder: '请选择',
							errorMsg: '请选择性别',
					},
			},
			birthday: {
					value: '1994-01-01',
					rules: {
							label: '出生日期',
							type: 'za-date',
							vRules: 'required',
							placeholder: '请选择',
							errorMsg: '请输入出生日期',
					},
					validators: [
							{
									name: '验证子女年龄',
									fields: ['p1-form1-text'],
									baseChecks:['LessThen']
							}
					],
			},
		},
		form2: {
			relation: {
				value: '',
				rules: {
					label: '是投保人',
					type: 'za-select',
					vRules: 'required',
					placeholder: '请选择',
					errorMsg: '请选择与投保人的关系',
					showName: true,
						options: [[
								{name: '本人', value: '00'},
								{name: '配偶', value: '01'},
								{name: '子女', value: '02'},
								{name: '父母', value: '03'},
								{name: '其他', value: '06'}
						]]
				}
			},
			name: {
				value: '',
				rules: {
					label: '姓名',
					type: 'za-input',
					vRules: 'required|username|usernameLength',
					placeholder: '请输入姓名',
					errorMsg: '请输入姓名',
					readOnly:false
				}
			},
			genderCode: {
				value: 'M',
				rules: {
					label: '性别',
					type: 'za-sex',
					vRules: 'required',
					placeholder: '请选择',
					errorMsg: '请输入性别',
					readOnly:false
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
					readOnly:false,
					stime:'1940-01-01',
					etime:'',
				}
			},
		}
  },
  // p2: {
  // }
}

module.exports = payload => wrapper(formModels)