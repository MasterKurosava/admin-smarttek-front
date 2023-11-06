import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { deleteCompany, useAppDispatch } from '@/store'
import { Company } from '@/@types/admin/company'


interface DeleteCarFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    currentCompany: Company | undefined
}

const DeleteCarForm: React.FC<DeleteCarFormProps> = ({ isOpen, setIsOpen, currentCompany}) => {
    const dispatch = useAppDispatch()
    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        setIsOpen(false)
        
        if(currentCompany){
            dispatch(deleteCompany(currentCompany.id))
        }
    }

    return (
        <div>
            <Dialog
                isOpen={isOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Удаление компании</h5>
                <p>
                    Вы уверены что хотите удалить компанию {currentCompany?.related.name}?
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Закрыть
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Удалить
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default DeleteCarForm

