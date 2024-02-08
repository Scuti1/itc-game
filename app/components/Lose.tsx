import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'

export default function Lose(props: any) {
  const { loserInfo } = props
  return (
    <>
      <Modal isOpen={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Хожигдлоо
              </ModalHeader>
              <ModalBody>
                <p className="text-4xl">{loserInfo.name} </p>
                <br />
                <p> баг хожигдлоо дараагийн тэмцээнд амжилт хүсье</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
