import React from 'react'
import {
  Type, Image as ImageIcon, Save, Download, Mail,
  Undo, Redo, Square, Circle, Triangle, ArrowRight, Star, Heart, Minus, Palette
} from 'lucide-react'
import { getArtTextTemplatesByCategory } from '../../templates/artTextTemplates'

/**
 * Editor Toolbar Component
 * Handles adding elements and editor actions
 */
export const EditorToolbar = ({
  onAddText,
  onAddArtText,
  onAddImage,
  onAddShape,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSave,
  onExportPDF,
  onShowEmailModal
}) => {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-section">
        <button className="toolbar-btn" onClick={onAddText} title="Add Text">
          <Type size={20} />
          <span>Add Text</span>
        </button>
        <div className="toolbar-dropdown">
          <button className="toolbar-btn dropdown-toggle" title="Add Art Text">
            <Palette size={20} />
            <span>Art Text</span>
          </button>
          <div className="dropdown-menu art-text-menu">
            <div className="dropdown-section">
              <h4>Preset Styles</h4>
              <div className="art-text-templates">
                {getArtTextTemplatesByCategory('all').map(template => (
                  <button
                    key={template.id}
                    className="dropdown-item art-text-template"
                    onClick={() => onAddArtText(template.id)}
                    title={template.name}
                  >
                    <span className="template-preview">{template.preview}</span>
                    <span className="template-name">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="toolbar-btn" onClick={onAddImage} title="Add Image">
          <ImageIcon size={20} />
          <span>Add Image</span>
        </button>
      </div>

      <div className="toolbar-section">
        <div className="toolbar-dropdown">
          <button className="toolbar-btn dropdown-toggle" title="Add Shapes">
            <Square size={20} />
            <span>Shapes</span>
          </button>
          <div className="dropdown-menu">
            <button onClick={() => onAddShape('rectangle')} className="dropdown-item">
              <Square size={16} />
              Rectangle
            </button>
            <button onClick={() => onAddShape('circle')} className="dropdown-item">
              <Circle size={16} />
              Circle
            </button>
            <button onClick={() => onAddShape('triangle')} className="dropdown-item">
              <Triangle size={16} />
              Triangle
            </button>
            <button onClick={() => onAddShape('arrow')} className="dropdown-item">
              <ArrowRight size={16} />
              Arrow
            </button>
            <button onClick={() => onAddShape('star')} className="dropdown-item">
              <Star size={16} />
              Star
            </button>
            <button onClick={() => onAddShape('heart')} className="dropdown-item">
              <Heart size={16} />
              Heart
            </button>
            <button onClick={() => onAddShape('line')} className="dropdown-item">
              <Minus size={16} />
              Line
            </button>
          </div>
        </div>
      </div>

      <div className="toolbar-section">
        <button 
          className="toolbar-btn" 
          onClick={onUndo} 
          disabled={!canUndo}
          title="Undo"
        >
          <Undo size={20} />
        </button>
        <button 
          className="toolbar-btn" 
          onClick={onRedo} 
          disabled={!canRedo}
          title="Redo"
        >
          <Redo size={20} />
        </button>
      </div>

      <div className="toolbar-section">
        <button className="toolbar-btn" onClick={onSave} title="Save Design">
          <Save size={20} />
          <span>Save</span>
        </button>
        <button className="toolbar-btn" onClick={onExportPDF} title="Export PDF">
          <Download size={20} />
          <span>PDF</span>
        </button>
        <button className="toolbar-btn" onClick={onShowEmailModal} title="Send Email">
          <Mail size={20} />
          <span>Email</span>
        </button>
      </div>
    </div>
  )
}

