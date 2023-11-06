import Dialog from '@/components/ui/Dialog'
import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Field, FieldProps, Form, Formik } from 'formik'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import * as Yup from 'yup'
import {useEffect} from 'react'
import type { MouseEvent } from 'react'
import { attachOwnerCompany, injectReducer, useAppDispatch, useAppSelector } from '@/store'
import { getOrganizationId } from '@/services/token'
import { Select } from '@/components/ui'
import { Option } from '@/@types/share/share'
import reducer, { fetchAllUsers } from '@/store/slices/admin/allUsersSlice'
import { attachCar } from '@/store/slices/org'


const validationSchema = Yup.object().shape({
    user_id: Yup.number().required('Поле "Пользователь" обязательно для заполнения'),
})


interface AttachPointFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    companyId: number
}

injectReducer('allAdminUsers', reducer)
const AttachCompanyUserForm: React.FC<AttachPointFormProps> = ({ isOpen, setIsOpen, companyId }) => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.allAdminUsers)

    useEffect(()=>{
        dispatch(fetchAllUsers())
    },[])

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const confirmForm = (values: any) =>{ 
        dispatch(attachOwnerCompany({c_id: companyId, u_id:values.user_id}))
        setIsOpen(false)
    }

    const options: Option[] = users.map(u=>{
        return {value: u.id, label: u.first_name + u.second_name}
    }) 
    
    console.log(users);
    
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
                    <h5 className="mb-4">Прикрепление машины за пользоватем</h5>
                    <Formik
                    initialValues={{
                        user_id: 0,
                    }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    confirmForm(values)
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Номер"
                                invalid={errors.user_id && touched.user_id}
                                errorMessage={errors.user_id}
                            >
                                <Field name="user_id">
                                    {({ field, form }: FieldProps<any>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) =>
                                                    option.value ===values.user_id
                                            )}
                                            onChange={(option) =>{
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )}
                                            }
                                        />
                                    )}
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
                                    Прикрепить
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

export default AttachCompanyUserForm