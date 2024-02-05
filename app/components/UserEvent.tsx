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
import { userEventList } from '@/data'

const columns = [
  { name: 'Нэр', uid: 'name' },
  { name: 'Хугацаа', uid: 'time' },
]
const UserEvent = () => {
  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{
              radius: 'lg',
              src: user.sex == 'female' ? '/women.png' : '/man.png',
            }}
            description={'unknown'}
            name={user.displayName}
          ></User>
        )

      case 'time':
        return (
          <Chip
            className="capitalize"
            color={user.passed ? 'success' : 'danger'}
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
      <TableBody items={userEventList}>
        {(item) => (
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
