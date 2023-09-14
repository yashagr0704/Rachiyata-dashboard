import styled from '@emotion/styled'
import { Button, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledChip from './StyledChip'
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import StarIcon from '@mui/icons-material/Star'
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import MoreOptions from './MoreOptions'
import { useRouter } from 'next/router'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import Link from 'next/link'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded'
import InfoModal from 'components/StyledModal/InfoModal'
import DeleteModal from 'components/StyledModal/DeleteModal'
import { useCreateOrUpdateNovelAPI, useDeleteNovelAPI } from 'Containers/NovelDetails/api/novel.hook'

const InfoArea = ({ item }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  // const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false)
  const { handleDeleteNovel, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess } = useDeleteNovelAPI(item?.id)
  const {
    handleSubmitNovel,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useCreateOrUpdateNovelAPI(true, item?.id)

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsUnpublishModalOpen(false)
      setIsPublishModalOpen(false)
    }
  }, [isUpdateSuccess])

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsDeleteModalOpen(false)
    }
  }, [isDeleteSuccess])

  return (
    <Root>
      <DeleteModal
        messageNotice={`Do you want to Delete Novel Named ${item?.book_name} ?`}
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        isLoading={isDeleteLoading}
        onDelete={handleDeleteNovel}
      />
      <InfoModal
        messageNotice={`Do you want to Publish Novel Named ${item?.book_name} ?`}
        open={isPublishModalOpen}
        setOpen={setIsPublishModalOpen}
        isLoading={isUpdateLoading}
        onClickOk={() => {
          handleSubmitNovel({ ...item, bookId: item?.id, is_published: true })
        }}
      />
      <InfoModal
        messageNotice={`Do you want to Unpublish Novel Named ${item?.book_name} ?`}
        open={isUnpublishModalOpen}
        setOpen={setIsUnpublishModalOpen}
        isLoading={isUpdateLoading}
        onClickOk={() => {
          handleSubmitNovel({ ...item, bookId: item?.id, is_published: false })
        }}
      />
      {/* <InfoModal
        messageNotice={`Do you want to Restore Novel Named ${item?.book_name} ?`}
        open={isRestoreModalOpen}
        setOpen={setIsRestoreModalOpen}
        isLoading={isUpdateLoading}
        onClickOk={() => {
          handleSubmitChapter({ ...item, is_published: false })
        }}
      /> */}
      <BookName variant="h3">{item?.book_name}</BookName>
      <InfoChipList>
        {item?.category?.map(({ name, id }) => (
          <StyledChip label={name} key={id} />
        ))}
        <StyledChip label={`${item?.chapter_count} Chapters`} Icon={CollectionsBookmarkRoundedIcon} />
        <StyledChip label={`${item?.chapter_count} Views`} Icon={RemoveRedEyeRoundedIcon} />
      </InfoChipList>
      <Author color="secondary">
        Author: <b>{item?.alternate_name}</b>
      </Author>
      <RatingRoot>
        <Rating
          color="primary"
          sx={{ color: theme => theme.palette.primary.main }}
          value={Number(Number(item?.rating?.rate__avg).toFixed(1))}
          readOnly
          size="large"
          precision={0.1}
          emptyIcon={<StarIcon fontSize="inherit" sx={{ color: theme => theme.palette.primary.main + '39' }} />}
        />
        {<TotalRating color="secondary" variant="subtitle2">{`(${item?.rating?.rate__count})`}</TotalRating>}
      </RatingRoot>
      <ButtonList>
        <Link href={`/workspace/novel/edit/${item?.id}`}>
          <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />}>
            Edit
          </Button>
        </Link>
        <Button variant="contained" startIcon={<ThumbUpRoundedIcon />}>
          {item?.like_count}
        </Button>

        {item?.is_published ? (
          <Button
            variant="contained"
            color="warning"
            startIcon={<UnpublishedRoundedIcon />}
            onClick={() => setIsUnpublishModalOpen(true)}>
            Unpublish
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            startIcon={<PublishRoundedIcon />}
            onClick={() => setIsPublishModalOpen(true)}>
            Publish
          </Button>
        )}
        {/* {item?.deleted_at ? ( */}
        {/* <Button variant="contained" color="success" startIcon={<RestoreFromTrashRoundedIcon />}>
            Restore
          </Button> */}
        {/* ) : ( */}
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineRoundedIcon />}
          onClick={() => setIsDeleteModalOpen(true)}>
          Delete
        </Button>
        {/* )} */}
        <MoreOptions />
      </ButtonList>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 800px) {
    gap: 20px;
  }
`

const BookName = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.headingColor.main};
`

const InfoChipList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const Author = styled(Typography)`
  margin-top: 4px;
`

const RatingRoot = styled.div`
  display: flex;
  gap: 5px;
`

const TotalRating = styled(Typography)``

const ButtonList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  flex-wrap: wrap;
`

export default InfoArea
