export default function Banner({ text }: { text: string }) {
  return (
    <div style={{
      background: '#F1F4FA',
      color: '#0B1D39',
      padding: '16px',
      borderRadius: 12,
      border: '1px solid #e3e7f0'
    }}>
      <strong>{text}</strong>
    </div>
  );
}
