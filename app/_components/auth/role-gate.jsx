"use client";

import { useCurrentRole } from "@/hooks/useCanvasRole";
import { FormError } from "../form/form-error";

const RoleGate = ({ children, allowedRole }) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content" />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
