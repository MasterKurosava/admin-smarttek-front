import Dialog from '@/components/ui/Dialog'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik, FieldProps } from 'formik'
import * as Yup from 'yup'
import type { MouseEvent } from 'react'
import { minusBalance } from '@/services/admin/CompanyService'


const validationSchema = Yup.object().shape({
    sum: Yup.number()
    .required('Поле "Сумма" обязательно для заполнения')
    .positive('Сумма должна быть больше нуля')
    .integer('Сумма должна быть целым числом')
});

interface AddCompanyFormProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  company_id: number | undefined
}

const MinusBalanceForm: React.FC<AddCompanyFormProps> = ({ isOpen, setIsOpen, company_id}) => {

  const onDialogClose = (e: MouseEvent) => {
    setIsOpen(false)
  }

  const confirmForm = async (values: any) => {
    if(company_id)(
      await minusBalance(company_id, {summ: values.sum})
    )
    setIsOpen(false)
    location.reload();
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
          <h5 className="mb-4">Пополнение баланса</h5>
          <Formik
            initialValues={{
                sum: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                const safeValues: any = {
                    sum: values.sum,
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
                    label="Сумма"
                    invalid={errors.sum && touched.sum}
                    errorMessage={errors.sum}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="sum"
                      placeholder="Введите кол-во тенге"
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
                        Подтвердить
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

export default MinusBalanceForm
