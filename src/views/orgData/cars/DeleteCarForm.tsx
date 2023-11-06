
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { useAppDispatch } from '@/store'
import { deleteCar, deletePoint } from '@/store/slices/org'
import { Car, SingleCar } from '@/@types/organization/car'


interface DeleteCarFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    currentCar: SingleCar | undefined
}

const DeleteCarForm: React.FC<DeleteCarFormProps> = ({ isOpen, setIsOpen, currentCar}) => {
    const dispatch = useAppDispatch()
    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        setIsOpen(false)

        if(currentCar){
            dispatch(deleteCar(currentCar.id))
        }
    }

    return (
        <div>
            <Dialog
                isOpen={isOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Удаление заправки</h5>
                <p>
                    Вы уверены что хотите удалить заправку {currentCar ? currentCar.registration_number + currentCar?.registration_letters + currentCar?.region : ''}?
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

