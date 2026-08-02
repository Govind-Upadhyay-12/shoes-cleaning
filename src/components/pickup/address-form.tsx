"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PICKUP_SLOTS } from "@/constants";
import type { PickupDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address: z.string().min(8, "Enter a complete address"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  preferredPickupTime: z.enum(["Morning", "Afternoon", "Evening"]),
  notes: z.string().optional(),
});

type Props = {
  onSubmit: (data: PickupDetails) => void;
  loading?: boolean;
};

export function AddressForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PickupDetails>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferredPickupTime: "Afternoon",
      notes: "",
    },
  });

  const selected = watch("preferredPickupTime");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" placeholder="Aarav Mehta" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="9876543210" inputMode="numeric" {...register("phone")} />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          placeholder="House / flat, street, landmark"
          rows={3}
          {...register("address")}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode</Label>
        <Input id="pincode" placeholder="560001" inputMode="numeric" {...register("pincode")} />
        {errors.pincode && (
          <p className="text-sm text-destructive">{errors.pincode.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Preferred Pickup Time</Label>
        <div className="grid gap-2 sm:grid-cols-3">
          {PICKUP_SLOTS.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() =>
                setValue("preferredPickupTime", slot.value, { shouldValidate: true })
              }
              className={cn(
                "rounded-2xl border px-3 py-3 text-left transition",
                selected === slot.value
                  ? "border-primary bg-accent"
                  : "border-border bg-white hover:border-primary/40"
              )}
            >
              <p className="text-sm font-medium">{slot.label}</p>
              <p className="text-xs text-muted-foreground">{slot.window}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Pickup Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Gate code, landmark, etc."
          rows={2}
          {...register("notes")}
        />
      </div>

      <Button type="submit" size="lg" className="h-12 w-full rounded-full" disabled={loading}>
        {loading ? "Confirming..." : "Continue"}
      </Button>
    </form>
  );
}
