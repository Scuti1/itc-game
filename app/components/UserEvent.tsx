'use client'
import React from 'react'
import { User } from '@nextui-org/user'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

const columns = [
  { name: 'Нэр', uid: 'name' },
  { name: 'Хугацаа', uid: 'time' },
]
const UserEvent = (props: any) => {
  const { eventList } = props
  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{
              radius: 'lg',
              src: '/man.png',
            }}
            name={user.name}
          ></User>
        )

      case 'time':
        return (
          <Chip
            className="capitalize"
            color={user.time > 10 ? 'danger' : 'success'}
            size="sm"
            variant="flat"
          >
            00:00:{cellValue}
          </Chip>
        )
      default:
        return cellValue
    }
  }, [])
  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={eventList}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default UserEvent
