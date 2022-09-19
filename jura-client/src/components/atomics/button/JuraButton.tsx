import React from 'react';
import Button from 'react-bootstrap/Button';

type VariantProps = 'primary' | 'success' | 'warning' | 'danger' | 'icon';

type SizeProps = 'sm' | 'lg' | undefined;

type JuraButtonProps = {
  title: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant: VariantProps;
  onClick?: (event?: any) => any;
  icon?: React.ReactElement;
  size?: SizeProps;
  parentId?: string;
  disabled?: boolean;
};

export const JuraButton = ({ title, type, variant, onClick, icon, size, parentId, disabled }: JuraButtonProps) => {
  return (
    <Button data-testid={`${parentId}-button`} type={type} onClick={onClick} variant={variant} size={size} disabled={disabled}>
      <div className="d-flex align-items-center">
        {icon && icon}
        {title}
      </div>
    </Button>
  );
};
