import Dialog from '@/components/ui/Dialog'
import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik, FieldProps } from 'formik'
import * as Yup from 'yup'
import {useEffect} from 'react'
import type { MouseEvent } from 'react'
import { addCompany, useAppDispatch } from '@/store'
import { Select } from '@/components/ui'
import { AddCompanyCredential, CompanyType } from '@/@types/admin/company'


const validationSchema = Yup.object().shape({
  type: Yup.string()
    .required('Поле "Тип" обязательно для заполнения')
    .oneOf(['organization', 'fuel_supplier'], 'Неверный тип'),
  name: Yup.string()
    .required('Поле "Название" обязательно для заполнения')
    .min(3, 'Минимальная длина - 3 символа')
    .max(40, 'Максимальная длина - 40 символов')
});

interface AddCompanyFormProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch()

  const onDialogClose = (e: MouseEvent) => {
    setIsOpen(false)
  }

  const confirmForm = (values:AddCompanyCredential) => {
    dispatch(addCompany(values))
    setIsOpen(false)
  }

  return (
    <div>
      <Dialog
        isOpen={isOpen}
        style={{
          content: {
            marginTop: 10,
          },
        }}
        contentClassName="pb-0 px-0"
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <div className="px-6 pb-6">
          <h5 className="mb-4">Добавление компании</h5>
          <Formik
            initialValues={{
                type: '',
                name: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                const safeValues: AddCompanyCredential = {
                type: values.type as CompanyType,
                name: values.name,
                };

                confirmForm(safeValues);
                setSubmitting(false);
                resetForm();
            }}
            >
            {({ errors, touched, resetForm }) => (
              <Form>
                <FormContainer>
                  <FormItem
                    asterisk
                    label="Название"
                    invalid={errors.name && touched.name}
                    errorMessage={errors.name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="name"
                      placeholder="Введите название"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="Тип"
                    invalid={errors.type && touched.type}
                    errorMessage={errors.type}
                  >
                    <Field name="type">
                        {({ field, form }: FieldProps<any>) => {
                            const options = [
                            { value: 'fuel_supplier', label: 'Поставщик топлива' },
                            { value: 'organization', label: 'Организация' },
                            ];

                            return (
                            <Select
                                {...field}
                                options={options}
                                value={options.find(option => option.value === field.value)}
                                onChange={(selectedOption) => {
                                if (selectedOption) {
                                    form.setFieldValue(field.name, selectedOption.value);
                                    form.setFieldTouched(field.name, true);
                                } else {
                                    form.setFieldValue(field.name, '');
                                    form.setFieldTouched(field.name, false);
                                }
                                }}
                            />
                            );
                        }}
                    </Field>

                    </FormItem>

                  <FormItem>
                    <Button
                      type="reset"
                      className="ltr:mr-2 rtl:ml-2"
                      onClick={() => {
                        setIsOpen(false)
                        resetForm()
                      }}
                    >
                      Закрыть
                    </Button>
                    <Button variant="solid" type="submit">
                      Создать
                    </Button>
                  </FormItem>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  )
}

export default AddCompanyForm
