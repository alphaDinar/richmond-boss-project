'use client';
import { Dispatch, FC } from "react";
import styles from './mediaDialog.module.css';
import { MdClose, MdZoomIn } from "react-icons/md";
import { MediaType } from "@/types/media";

export type MediaDialogProps = {
  dialogOpen: boolean,
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>,
  media: MediaType | null
};

const MediaDialog: FC<MediaDialogProps> = ({ dialogOpen, setDialogOpen, media }) => {
  return (
    <dialog open={dialogOpen} className={styles.box}>
      <nav className={styles.navBox}>
        <MdZoomIn />
        <MdClose onClick={() => setDialogOpen(false)} />
      </nav>
      <section>
        <div>
          {/* <MediaBox media={media} /> */}
        </div>
      </section>
    </dialog>
  );
}

export default MediaDialog;