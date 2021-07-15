import { useState, useEffect, render, createElement, Fragment, useRef } from '@wordpress/element'
import {
    Popover,
    SlotFillProvider,
} from '@wordpress/components'
import { InterfaceSkeleton, FullscreenMode } from "@wordpress/interface"
import { parse } from '@wordpress/blocks'

import '../store'
import { registerBlocks } from '../lib/blocks'
import BlockEditor from './block-editor'
import Header from './header'
import Notices from './notices'
import Sidebar from './sidebar'
import FetchHandler from '../lib/fetch-handler'
import BindInput from '../lib/bind-input'
import EditorSettings from '../interfaces/editor-settings'
import MediaUpload from '../interfaces/media-upload'
import Block from '../interfaces/block'
import { useSelect, useDispatch } from '@wordpress/data'
import defaultSettings from '../lib/default-settings'

FetchHandler.register()

export interface EditorProps {
    settings: EditorSettings,
    onChange: (value: string) => void,
    value?: string,
}

const Editor = ({ settings, onChange, value }: EditorProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { setBlocks, undo, redo } = useDispatch('laraberg')
    const timeout = useRef<ReturnType<typeof setTimeout>>()

    const { blocks, canUndo, canRedo } = useSelect(select => {
        return {
            blocks: select('laraberg').getBlocks(),
            canUndo: select('laraberg').canUndo(),
            canRedo: select('laraberg').canRedo()
        }
    })

    useEffect(() => {
        registerBlocks()

        if (value) {
            setBlocks(parse(value))
        }
    }, [])

    const handleUpdateBlocks = (blocks: Block[]) => {
        if (timeout.current !== undefined) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            setBlocks(blocks)
        }, 300)
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <Fragment>
            <FullscreenMode isActive={false} />
            <SlotFillProvider>
            <InterfaceSkeleton
                        header={<Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />}
                        sidebar={sidebarOpen ? <Sidebar /> : null}
                        content={
                            <Fragment>
                                <Notices />
                                <BlockEditor
                                    blocks={blocks}
                                    updateBlocks={handleUpdateBlocks}
                                    onChange={onChange}
                                    undo={undo}
                                    redo={redo}
                                    canUndo={canUndo}
                                    canRedo={canRedo}
                                    settings={{...defaultSettings, ...settings}}
                                />
                            </Fragment>
                        }
                    />
                    <Popover.Slot />
            </SlotFillProvider>
        </Fragment>
    );
};

const initializeEditor = (element: HTMLInputElement | HTMLTextAreaElement, settings: EditorSettings = {}) => {
    document.addEventListener('DOMContentLoaded', () => {
        const input = new BindInput(element)

        const container = document.createElement('div')
        container.classList.add('laraberg-container')
        input.getElement().insertAdjacentElement('afterend', container)
        input.getElement().style.display = 'none';

        render(
            <Editor
                settings={settings}
                onChange={input.setValue}
                value={input.getValue() || undefined}
            />,
            container
        )
    })
}

export { initializeEditor, Editor }
