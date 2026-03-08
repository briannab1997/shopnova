export function ProductCardSkeleton() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <div className="skeleton" style={{ height: '200px', borderRadius: 0 }} />
      <div style={{ padding: '12px 16px 16px' }}>
        <div className="skeleton" style={{ height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '14px', width: '70%', marginBottom: '12px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '10px', width: '40%', marginBottom: '8px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '24px', width: '55%', marginBottom: '12px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '34px', borderRadius: '4px' }} />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px', maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="skeleton" style={{ height: '460px', borderRadius: '8px' }} />
      <div>
        <div className="skeleton" style={{ height: '16px', width: '30%', marginBottom: '16px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '28px', marginBottom: '8px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '28px', width: '80%', marginBottom: '16px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '24px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '48px', width: '60%', marginBottom: '16px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '44px', marginBottom: '8px', borderRadius: '24px' }} />
        <div className="skeleton" style={{ height: '44px', borderRadius: '24px' }} />
      </div>
    </div>
  );
}
