'use client'

import Image from 'next/image'

import styles from '../modalCreateEvent.module.scss'

import Button from '@/components/_shared/button/Button'

function FileUploaderPreview({arr, removePhoto}) {

    return (
        <>
            {
                arr.length > 0? 
                    arr.slice(0, 4).map((file) => {
                        return (
                            <div className={styles.eventPhotoPreview} key={file.name}>
                                <Image src={URL.createObjectURL(file)} width={134} height={81} alt={file.name} />
                                <Button
                                    btnClass={styles.deletePhotoBtn}
                                    btnName={''}
                                    data={file.name}
                                    onClick={(e) => {
                                        removePhoto(e);
                                    }}
                                />
                            </div>
                        )
                    })
                :
                    <></>
            }
        </>
    )
}

export default FileUploaderPreview;