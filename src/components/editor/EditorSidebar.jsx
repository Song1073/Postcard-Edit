import React from 'react'
import { Trash2 } from 'lucide-react'
import { BackgroundControls } from './BackgroundControls'
import { TextPropertiesPanel } from './TextPropertiesPanel'
import { ArtTextPropertiesPanel } from './ArtTextPropertiesPanel'
import { ImagePropertiesPanel } from './ImagePropertiesPanel'
import { ShapePropertiesPanel } from './ShapePropertiesPanel'

/**
 * Editor Sidebar Component
 * Container for all property panels
 */
export const EditorSidebar = ({
  cardData,
  selectedElement,
  backgroundControls,
  textProperties,
  artTextProperties,
  imageProperties,
  shapeProperties,
  onDeleteElement
}) => {
  const selectedElementData = selectedElement !== null ? cardData.elements[selectedElement] : null

  return (
    <div className="editor-sidebar">
      <BackgroundControls {...backgroundControls} />

      {selectedElement !== null && selectedElementData?.type === 'text' && (
        <TextPropertiesPanel {...textProperties} />
      )}

      {selectedElement !== null && selectedElementData?.type === 'art-text' && (
        <ArtTextPropertiesPanel {...artTextProperties} />
      )}

      {selectedElement !== null && selectedElementData?.type === 'image' && (
        <ImagePropertiesPanel {...imageProperties} />
      )}

      {selectedElement !== null && selectedElementData?.type === 'shape' && (
        <ShapePropertiesPanel {...shapeProperties} />
      )}

      {selectedElement !== null && (
        <div className="sidebar-section">
          <button 
            className="btn btn-secondary" 
            onClick={() => onDeleteElement(selectedElement)}
            style={{ width: '100%' }}
          >
            <Trash2 size={18} />
            Delete Element
          </button>
        </div>
      )}
    </div>
  )
}

