'use client'
import { useState } from 'react';
import Image from 'next/image'
import styles from '../modalCreateEvent.module.scss'

import Button from '@/components/_shared/button/Button';


function FileUploader({onChange}) {

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
        console.log(e);
        let files = [...e.dataTransfer.files];
        console.log(files);
        setDrag(false);
    }

    return (
        <div className={styles.filesInfoItem}>
            <input 
                accept='.jpg,.jpeg,.png '
                className={styles.eventFiles} 
                type='file' 
                id='eventFiles' 
                onClick={e => console.log(e.target)} 
                onDragStart={(e) => {dragHandler(e)}}
                onDragOver={(e) => {dragHandler(e)}}
                onDragLeave={(e) => {dragLeaveHandler(e)}}
                onDrop={(e) => {dropHandler(e)}}
                onChange={onChange}
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
    )
}

export default FileUploader;