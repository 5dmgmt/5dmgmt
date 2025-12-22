/**
 * components/shukuyo/styles.ts
 *
 * 宿曜関係図のスタイル定義
 */

export const shukuyoKankeiStyles = `
.shukuyo-kankei {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.sk-initial-screen {
  max-width: 500px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.sk-initial-screen h2 {
  color: var(--5d-text, #1a2a3a);
  margin-bottom: 12px;
}

.sk-description {
  color: var(--5d-text-secondary, #666);
  margin-bottom: 24px;
}

.sk-form-group {
  margin-bottom: 16px;
  text-align: left;
}

.sk-form-group label {
  display: block;
  font-weight: 600;
  color: var(--5d-text, #1a2a3a);
  margin-bottom: 8px;
}

.sk-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--5d-border, #e0e0e0);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.sk-input:focus {
  outline: none;
  border-color: var(--5d-teal, #00897b);
}

.sk-date-inputs {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.sk-select {
  padding: 12px 16px;
  border: 2px solid var(--5d-border, #e0e0e0);
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  min-width: 80px;
}

.sk-select-sm {
  padding: 8px 12px;
  min-width: 70px;
}

.sk-unit {
  font-weight: 600;
  color: var(--5d-text, #1a2a3a);
}

.sk-button {
  padding: 12px 24px;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--5d-border, #e0e0e0);
  color: var(--5d-text, #1a2a3a);
}

.sk-button:hover:not(:disabled) {
  opacity: 0.9;
}

.sk-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sk-button-primary {
  background: var(--5d-teal, #00897b);
  color: #fff;
  width: 100%;
  margin-top: 16px;
}

.sk-button-primary:hover:not(:disabled) {
  background: var(--5d-teal-dark, #00695c);
}

.sk-error {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  text-align: center;
}

.sk-success {
  background: #e6f7f5;
  color: #00695c;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  text-align: center;
}

/* メイン画面 */
.sk-main-content {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}

@media (max-width: 900px) {
  .sk-main-content {
    grid-template-columns: 1fr;
  }
}

.sk-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sk-base-person-card {
  background: linear-gradient(135deg, var(--5d-teal, #00897b) 0%, var(--5d-teal-dark, #00695c) 100%);
  color: #fff;
  padding: 20px;
  border-radius: 12px;
}

.sk-base-person-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 4px;
}

.sk-base-person-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.sk-base-person-details {
  font-size: 0.9rem;
  opacity: 0.95;
}

.sk-reset-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.sk-reset-btn:hover {
  background: rgba(255,255,255,0.3);
}

.sk-add-form {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.sk-add-form h3 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: var(--5d-text, #1a2a3a);
}

.sk-csv-section {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.sk-csv-section h4 {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  color: var(--5d-text, #1a2a3a);
}

.sk-csv-hint {
  font-size: 0.8rem;
  color: var(--5d-text-secondary, #666);
  margin-bottom: 8px;
}

.sk-sample-download {
  display: block;
  font-size: 0.85rem;
  color: var(--5d-teal, #00897b);
  text-decoration: underline;
  margin-bottom: 12px;
  cursor: pointer;
}

.sk-sample-download:hover {
  color: var(--5d-teal-dark, #00695c);
}

.sk-file-input {
  width: 100%;
  margin-bottom: 8px;
  font-size: 0.85rem;
}

.sk-person-list {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.sk-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.sk-list-header h4 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--5d-text, #1a2a3a);
}

.sk-clear-btn {
  padding: 4px 12px;
  background: #fee;
  border: none;
  border-radius: 4px;
  color: #c33;
  font-size: 0.8rem;
  cursor: pointer;
}

.sk-list-items {
  flex: 1;
  overflow-y: auto;
  max-height: 300px;
}

.sk-empty {
  color: #999;
  text-align: center;
  padding: 20px;
  font-size: 0.9rem;
}

.sk-person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--5d-border, #e0e0e0);
}

.sk-person-item:last-child {
  border-bottom: none;
}

.sk-person-item-name {
  font-weight: 600;
  color: var(--5d-text, #1a2a3a);
}

.sk-person-item-details {
  font-size: 0.8rem;
  color: var(--5d-text-secondary, #666);
}

.sk-special {
  color: #d32f2f;
}

.sk-delete-btn {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #666;
  font-size: 0.75rem;
  cursor: pointer;
}

.sk-delete-btn:hover {
  background: #fee;
  border-color: #c33;
  color: #c33;
}

/* 関係図エリア */
.sk-chart-area {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
}

.sk-chart-header {
  background: var(--5d-navy, #1a2a3a);
  color: #fff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.sk-chart-shuku {
  background: var(--5d-teal, #00897b);
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 600;
}

.sk-chart-name {
  font-size: 1.1rem;
}

.sk-svg-container {
  padding: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sk-svg-container svg {
  width: 100%;
  max-width: min(100%, calc(100vh - 250px));
  height: auto;
  aspect-ratio: 1 / 1;
}

@media (max-width: 768px) {
  .sk-svg-container {
    padding: 10px;
  }

  .sk-svg-container svg {
    width: 100%;
    max-width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
}
`;
