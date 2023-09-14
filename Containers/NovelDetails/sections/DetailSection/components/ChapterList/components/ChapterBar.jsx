import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, ButtonBase, IconButton, Typography } from '@mui/material'

import PaidRoundedIcon from '@mui/icons-material/PaidRounded'
import { useRouter } from 'next/router'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded'
import DeleteModal from 'components/StyledModal/DeleteModal'
import InfoModal from 'components/StyledModal/InfoModal'
import { useCreateOrUpdateNovelChapterAPI, useDeleteChapterAPI } from 'Containers/NovelDetails/api/novel.hook'

const ChapterBar = ({ refetch, bookId, item }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false)
  // const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)

  const { handleDeleteChapter, isLoading: isDeleteLoading } = useDeleteChapterAPI(
    item?.book_id,
    item?.id,
    setIsDeleteModalOpen,
    refetch,
  )
  const { handleSubmitChapter, isLoading: isUpdateLoading } = useCreateOrUpdateNovelChapterAPI(
    item?.book_id,
    isPublishModalOpen ? setIsPublishModalOpen : setIsUnpublishModalOpen,
    item?.id,
    refetch,
  )

  return (
    <Root>
      <DeleteModal
        messageNotice={`Do you want to Delete this Chapter ${item?.chapter_sequence} ?`}
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        isLoading={isDeleteLoading}
        onDelete={handleDeleteChapter}
      />
      <InfoModal
        messageNotice={`Do you want to Publish this Chapter ${item?.chapter_sequence} ?`}
        open={isPublishModalOpen}
        setOpen={setIsPublishModalOpen}
        isLoading={isUpdateLoading}
        onClickOk={() => {
          handleSubmitChapter({ ...item, is_published: true })
        }}
      />
      <InfoModal
        messageNotice={`Do you want to Unpublish this Chapter ${item?.chapter_sequence} ?`}
        open={isUnpublishModalOpen}
        setOpen={setIsUnpublishModalOpen}
        isLoading={isUpdateLoading}
        onClickOk={() => {
          handleSubmitChapter({ ...item, is_published: false })
        }}
      />
      {/* <InfoModal
        messageNotice={`Do you want to Restore this Chapter ${ChapterNumber} ?`}
        open={isRestoreModalOpen}
        setOpen={setIsRestoreModalOpen}
        isLoading={isLoading}
        onClickOk={() => {
          handleSubmitChapter({ ...item, is_published: false })
        }}
      /> */}
      <ChapterText variant="subtitle1">
        Chapter {item?.chapter_sequence}: {item?.chapter_title}
      </ChapterText>
      {item?.is_published ? (
        <StyledButton
          variant="contained"
          color="warning"
          startIcon={<UnpublishedRoundedIcon />}
          onClick={() => setIsUnpublishModalOpen(true)}>
          Unpublish
        </StyledButton>
      ) : (
        <StyledButton
          variant="contained"
          color="success"
          startIcon={<PublishRoundedIcon />}
          onClick={() => setIsPublishModalOpen(true)}>
          Publish
        </StyledButton>
      )}

      <StyledButton variant="contained" startIcon={<ModeEditOutlineOutlinedIcon />}>
        <StyledEditA
          target="_blank"
          href={`/workspace/novel/edit-chapter?bookId=${bookId}&&chapterId=${item?.id}`}
          rel="noreferrer"
        />
        Edit
      </StyledButton>

      {/* <StyledButton variant="contained" color="success" startIcon={<RestoreFromTrashRoundedIcon />}>
        Restore
      </StyledButton> */}

      <StyledButton
        variant="contained"
        color="error"
        startIcon={<DeleteOutlineRoundedIcon />}
        onClick={() => setIsDeleteModalOpen(true)}>
        Delete
      </StyledButton>
    </Root>
  )
}

const StyledEditA = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 13px;
  cursor: pointer;
  border-radius: 0px;
  box-shadow: none;

  :first-of-type {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    @media (max-width: 650px) {
      margin-left: auto;
    }
  }
  :last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 7px;
  padding-left: 11px;
  padding-right: 2px;
  font-weight: 500;
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.secondary.main};
  :nth-of-type(odd) {
    color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.primary.main}10;
  }
  gap: 0px;
  @media (max-width: 650px) {
    padding: 4px 7px;
    justify-content: stretch;
    flex-wrap: wrap;
    gap: 10px 0px;
  }
`
const ChapterText = styled(Typography)`
  margin-right: auto;
  font-weight: 500;
  @media (max-width: 650px) {
    width: 100%;
  }
`

export default ChapterBar
