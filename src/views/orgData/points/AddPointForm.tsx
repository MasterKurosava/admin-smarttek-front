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
import { addPoint } from '@/store/slices/org'
import { getOrganizationId } from '@/services/token'
import { Select } from '@/components/ui'
import { Option } from '@/@types/share/share'
import locationReducer, { fetchLocations } from '@/store/slices/org/locationsSlice'


const validationSchema = Yup.object().shape({
    long: Yup.number()
        .required('Поле "Долгота" обязательно для заполнения'),
    lat: Yup.number() 
        .required('Поле "Длина" обязательно для заполнения'),

    address: Yup.string()
        .required('Поле "Адрес" обязательно для заполнения')
        .min(2, 'Минимальная длина - 2 символа')
        .max(30, 'Максимальная длина - 30 символов'),
    location_id: Yup.number().required('Поле "Локация" обязательно для заполнения'),
    name: Yup.string()
        .required('Поле "Название" обязательно для заполнения')
        .min(2, 'Минимальная длина - 2 символа')
        .max(30, 'Максимальная длина - 30 символов'),
    start_time: Yup.string()
        .required('Поле "Начало работы" обязательно для заполнения')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Некорректный формат времени. Используйте формат "ЧЧ:ММ"'),
    end_time: Yup.string()
        .required('Поле "Конец работы" обязательно для заполнения')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Некорректный формат времени. Используйте формат "ЧЧ:ММ"'),
})


interface AddPointFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

injectReducer('orgLocations', locationReducer)
const AddPointForm: React.FC<AddPointFormProps> = ({ isOpen, setIsOpen }) => {
    const dispatch = useAppDispatch()
    const locations = useAppSelector((state) => state.orgLocations)

    useEffect(()=>{
        dispatch(fetchLocations())
    },[])

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const confirmForm = (values: FuellingPoint) =>{
        values = {...values, organization_id:getOrganizationId()}
        dispatch(addPoint(values))
        setIsOpen(false)
    }

    const options: Option[] = locations.map(l=>{
        return {value: l.id, label:l.name}
    })
    

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
                    <h5 className="mb-4">Добавление заправки</h5>
                    <Formik
                    initialValues={{
                        id:0,
                        organization_id:0,
                        long: 0,
                        lat: 0,
                        address: '',
                        location_id: 1,
                        name: '',
                        start_time: '',
                        end_time: ''
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
                            <FormItem asterisk label="Название" invalid={errors.name && touched.name} errorMessage={errors.name}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Заправка 1"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem asterisk label="Адрес" invalid={errors.address && touched.address} errorMessage={errors.address}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address"
                                    placeholder=""
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Локация"
                                invalid={errors.location_id && touched.location_id}
                                errorMessage={errors.location_id}
                            >
                                <Field name="location_id">
                                    {({ field, form }: FieldProps<FuellingPoint>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) =>
                                                    option.value ===values.location_id
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem asterisk label="Долгота" invalid={errors.long && touched.long} errorMessage={errors.long}>
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="long"
                                    placeholder=""
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem  asterisk label="Ширина" invalid={errors.lat && touched.lat} errorMessage={errors.lat}>
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="lat"
                                    placeholder=""
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem asterisk label="Начало работы" invalid={errors.start_time && touched.start_time} errorMessage={errors.start_time}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="start_time"
                                    placeholder="09:05"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem asterisk label="Конец работы" invalid={errors.end_time && touched.end_time} errorMessage={errors.end_time}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="end_time"
                                    placeholder="23:30"
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

export default AddPointForm