'use client'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { User } from '@nextui-org/user'
import { userList } from '@/data'
import React from 'react'
import { HeartIcon } from '@/app/asset/HeartIcon'
import { CheckIcon } from '@nextui-org/shared-icons'

const columns = [
  { name: 'Нэр', uid: 'name' },
  { name: 'Хариулт', uid: 'score' },
  { name: 'Боломж', uid: 'check' },
]

const checkRender = (checkNumber: number) => {
  let checks = []
  if (checkNumber == 0) {
    return (
      <Chip className="capitalize" color="danger" size="sm" variant="flat">
        Хожигдсон
      </Chip>
    )
  } else {
    while (checkNumber > 0) {
      checks.push(
        <Chip className="capitalize" color="warning" size="sm" variant="flat">
          <HeartIcon
            filled={undefined}
            size={undefined}
            height={undefined}
            width={undefined}
            label={undefined}
          />
        </Chip>,
      )
      checkNumber--
    }
  }
  return checks
}

const UserList = (props: any) => {
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

      case 'score':
        return (
          <Chip
            className="capitalize"
            color="success"
            size="sm"
            variant="flat"
            startContent={<CheckIcon />}
          >
            {cellValue} зөв хариулсан
          </Chip>
        )
      case 'check':
        return <div className="flex">{checkRender(cellValue)}</div>
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
      <TableBody items={userList}>
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

export default UserList
