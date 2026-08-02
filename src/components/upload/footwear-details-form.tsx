"use client";

import {
  COLOR_OPTIONS,
  DIRT_LEVEL_OPTIONS,
  FOOTWEAR_TYPE_OPTIONS,
  MATERIAL_OPTIONS,
  STAIN_OPTIONS,
  type ColorType,
  type DirtLevel,
  type FootwearType,
  type MaterialType,
  type StainType,
} from "@/lib/estimate-rules";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FootwearFormState = {
  shoe_type: FootwearType | "";
  brand: string;
  material: MaterialType | "";
  primary_color: ColorType | "";
  dirt_level: DirtLevel | "";
  stains: StainType[];
  visible_damage: boolean;
};

export const EMPTY_FOOTWEAR_FORM: FootwearFormState = {
  shoe_type: "",
  brand: "",
  material: "",
  primary_color: "",
  dirt_level: "",
  stains: [],
  visible_damage: false,
};

type Props = {
  value: FootwearFormState;
  onChange: (value: FootwearFormState) => void;
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-primary bg-accent text-primary"
          : "border-border bg-white text-muted-foreground hover:border-primary/40"
      )}
    >
      {children}
    </button>
  );
}

export function FootwearDetailsForm({ value, onChange }: Props) {
  function toggleStain(stain: StainType) {
    if (stain === "None") {
      onChange({ ...value, stains: ["None"] });
      return;
    }
    const withoutNone = value.stains.filter((s) => s !== "None");
    const next = withoutNone.includes(stain)
      ? withoutNone.filter((s) => s !== stain)
      : [...withoutNone, stain];
    onChange({ ...value, stains: next });
  }

  return (
    <div className="space-y-5 rounded-[1.75rem] border border-border bg-white p-4 sm:p-5">
      <div>
        <Label className="text-sm font-semibold">Footwear type</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {FOOTWEAR_TYPE_OPTIONS.map((type) => (
            <Chip
              key={type}
              active={value.shoe_type === type}
              onClick={() => onChange({ ...value, shoe_type: type })}
            >
              {type}
            </Chip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="brand">Brand (optional)</Label>
        <Input
          id="brand"
          placeholder="Nike, Adidas, Bata…"
          value={value.brand}
          onChange={(e) => onChange({ ...value, brand: e.target.value })}
        />
      </div>

      <div>
        <Label className="text-sm font-semibold">Material</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {MATERIAL_OPTIONS.map((material) => (
            <Chip
              key={material}
              active={value.material === material}
              onClick={() => onChange({ ...value, material })}
            >
              {material}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold">Main color</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((color) => (
            <Chip
              key={color}
              active={value.primary_color === color}
              onClick={() => onChange({ ...value, primary_color: color })}
            >
              {color}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold">Dirt level</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {DIRT_LEVEL_OPTIONS.map((level) => (
            <Chip
              key={level}
              active={value.dirt_level === level}
              onClick={() => onChange({ ...value, dirt_level: level })}
            >
              {level}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold">Stains</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {STAIN_OPTIONS.map((stain) => (
            <Chip
              key={stain}
              active={value.stains.includes(stain)}
              onClick={() => toggleStain(stain)}
            >
              {stain}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold">Visible damage?</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip
            active={!value.visible_damage}
            onClick={() => onChange({ ...value, visible_damage: false })}
          >
            No
          </Chip>
          <Chip
            active={value.visible_damage}
            onClick={() => onChange({ ...value, visible_damage: true })}
          >
            Yes (tear / sole issue)
          </Chip>
        </div>
      </div>
    </div>
  );
}
