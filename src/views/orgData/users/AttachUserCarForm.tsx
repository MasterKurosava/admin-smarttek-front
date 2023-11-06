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
import { injectReducer, useAppDispatch, useAppSelector } from '@/store'
import { getOrganizationId } from '@/services/token'
import { Select } from '@/components/ui'
import { Option } from '@/@types/share/share'
import reducer, { attachCar, fetchCars } from '@/store/slices/org/carsSlice'


const validationSchema = Yup.object().shape({
    car_id: Yup.number().required('Поле "Машина" обязательно для заполнения'),
})


interface AttachUserFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    userId: number
}

injectReducer('orgUsers', reducer)

const AttachUserCarForm: React.FC<AttachUserFormProps> = ({ isOpen, setIsOpen, userId }) => {
    const dispatch = useAppDispatch()
    const cars = useAppSelector((state) => state.orgCars)

    useEffect(()=>{
        dispatch(fetchCars())
    },[])

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const confirmForm = (values: any) =>{
        dispatch(attachCar({c_id: values.car_id, u_id:userId}))
        setIsOpen(false)
    }

    const options: Option[] = cars.map(c=>{
        return {value: c.car.id, label: c.car.registration_number+c.car.registration_letters+c.car.region
        + (c.car.owner ? "-" + c.car.owner?.first_name+ " " + c.car.owner?.second_name : '')
        }
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
                    <h5 className="mb-4">Прикрепление машины за пользоватем</h5>
                    <Formik
                    initialValues={{
                        car_id: 0,
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
                                label="Машина"
                                invalid={errors.car_id && touched.car_id}
                                errorMessage={errors.car_id}
                            >
                                <Field name="car_id">
                                    {({ field, form }: FieldProps<number>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) =>
                                                    option.value ===values.car_id
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

export default AttachUserCarForm