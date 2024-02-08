import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'

export default function Win(props: any) {
  const { winnerInfo } = props
  return (
    <>
      <Modal isOpen={true} hideCloseButton={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Тэмцээний ялагчаар
              </ModalHeader>
              <ModalBody>
                <p className="text-4xl">{winnerInfo.name} баг тодорлоо</p>
                <br />
                <p> Баяр хүргэе</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
