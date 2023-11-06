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
import { AddPointsCredential, FuellingPoint } from '@/@types/organization/fuellingPoint'
import { injectReducer, useAppDispatch, useAppSelector } from '@/store'
import { addCar, addPoint } from '@/store/slices/org'
import { getOrganizationId } from '@/services/token'
import { Select } from '@/components/ui'
import { Option } from '@/@types/share/share'
import locationReducer, { fetchLocations } from '@/store/slices/org/locationsSlice'
import { AddCarCredential, Car } from '@/@types/organization/car'



const validationSchema = Yup.object().shape({
    region: Yup.number()
        .required('Поле "Регион" обязательно для заполнения')
        .min(0, 'Минимальное значение - 0')
        .max(99, 'Максимальное значение - 99'),
    registration_letters: Yup.string()
        .required('Поле "Буквы регистрации" обязательно для заполнения')
        .matches(/^[A-Z]{3}$/, 'Требуется три заглавные буквы'),
    registration_number: Yup.string()
        .required('Поле "Номер регистрации" обязательно для заполнения')
        .matches(/^\d{3}$/, 'Требуется три цифры'),
});


interface AddCarFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCarForm: React.FC<AddCarFormProps> = ({ isOpen, setIsOpen }) => {
    const dispatch = useAppDispatch()

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const confirmForm = (values: AddCarCredential) =>{
        dispatch(addCar(values))
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
                    <h5 className="mb-4">Добавление машины</h5>
                    <Formik
                    initialValues={{
                        region:'',
                        registration_letters:'',
                        registration_number: '',
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
                            <FormItem asterisk label="Рег. номер" invalid={errors.registration_number && touched.registration_number} errorMessage={errors.registration_number}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="registration_number"
                                    placeholder="999"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem asterisk label="Рег. буквы" invalid={errors.registration_letters && touched.registration_letters} errorMessage={errors.registration_letters}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="registration_letters"
                                    placeholder="AAA"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem asterisk label="Регион" invalid={errors.region && touched.region} errorMessage={errors.region}>
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="region"
                                    placeholder="12"
                                    component={Input}
                                />
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

export default AddCarForm