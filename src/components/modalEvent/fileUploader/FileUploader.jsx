'use client'

import { useState } from 'react'

import styles from '../modalCreateEvent.module.scss'

function FileUploader({addPhotos, errors}) {
    let [drag, setDrag] = useState(false);

    let dragHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    let dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    let dropHandler = (e) => {
        e.preventDefault();
        setDrag(false);
        let files = [...e.dataTransfer.files];
        addPhotos(files);
    }

    let onChangeHandler = (e) => {
        let files = [...e.target.files];
        addPhotos(files);
    }

    return (
        <>
            <div className={styles.filesInfoItem}>
                <input 
                    accept='.jpg,.jpeg,.png '
                    className={styles.eventFiles} 
                    type='file' 
                    id='eventFiles' 
                    onDragStart={(e) => {dragHandler(e)}}
                    onDragOver={(e) => {dragHandler(e)}}
                    onDragLeave={(e) => {dragLeaveHandler(e)}}
                    onDrop={(e) => {dropHandler(e)}}
                    onChange={(e) => {onChangeHandler(e)}}
                    multiple
                />
                <label className={styles.eventFilesLable} htmlFor='eventFiles'>
                    {
                        drag?
                            'Отпустите файлы для загрузки'
                        :
                            'Выберите фото или перетащите сюда'
                    }
                </label>
            </div>
            <div className={styles.eventFileError}>
                {
                    errors.length > 0?
                    errors.map((error) => {
                        return (
                            <span key={error.fileName}>{error.message}</span>
                        )
                    })
                    :
                    <></>
                }
            </div>
        </>
    )
}

export default FileUploader;