
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { useAppDispatch } from '@/store'
import { FuellingPoint } from '@/@types/organization/fuellingPoint'
import { deleteFuelPoint } from '@/store/slices/fuel_suplier'


interface DeletePointFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    currentPoint: FuellingPoint | undefined
}

const DeleteFuelPointForm: React.FC<DeletePointFormProps> = ({ isOpen, setIsOpen, currentPoint}) => {
    const dispatch = useAppDispatch()
    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        setIsOpen(false)
        if(currentPoint){
            dispatch(deleteFuelPoint(currentPoint.id))
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
                    Вы уверены что хотите удалить заправку {currentPoint?.name}?
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

export default DeleteFuelPointForm

