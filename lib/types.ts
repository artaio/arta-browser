export type AccessRestriction =
  | 'elevator_only'
  | 'freight_elevator'
  | 'loading_dock'
  | 'loading_dock_low'
  | 'low_clearance'
  | 'non_paved'
  | 'stairs_only'
  | 'steep_gradient';

export type PackingSubType =
  | 'alcohol_case'
  | 'lay_flat_wine_box'
  | 'blanket'
  | 'wardrobe_box'
  | 'cardboard_box'
  | 'chandelier_box'
  | 'chair_box'
  | 'cbin_closed'
  | 'cbin_open'
  | 'ply_box'
  | 'fine_art_econo_crate'
  | 'fine_art_international_crate'
  | 'econo_crate'
  | 'international_econo_crate'
  | 'furniture_crate'
  | 'international_furniture_crate'
  | 'parcel_crate'
  | 'museum_crate'
  | 'international_museum_crate'
  | 'foam_lined_box'
  | 'cavity_box'
  | 'strongbox'
  | 'double_box'
  | 'travel_frame'
  | 'travel_frame_art'
  | 'travel_frame_other'
  | 'a_frame'
  | 'slat_crate'
  | 'tri_wall_crate'
  | 'lockbox'
  | 'no_packing'
  | 'pallet'
  | 'international_pallet'
  | 'portfolio'
  | 'rug_rolled'
  | 'shadow_box'
  | 'slipcase'
  | 'slipcase_glass_tape'
  | 'poly_cardboard'
  | 'bubble_cardboard'
  | 'garment_bag'
  | 'poly_only'
  | 'dartek_only'
  | 'bubble_only'
  | 'cling_wrap'
  | 'cbin_communal'
  | 'sonotube'
  | 'stabilizing_box'
  | 'shipping_tube_small'
  | 'shipping_tube_large';

export type ObjectMaterial =
  | 'stone_marble'
  | 'precious_stones'
  | 'fiber_synthetic'
  | 'fabric_natural'
  | 'taxidermy'
  | 'carbon_fiber'
  | 'live_animal'
  | 'paper'
  | 'glass'
  | 'presious_metals'
  | 'particleboard'
  | 'styrofoam'
  | 'wood'
  | 'photo_film'
  | 'sand'
  | 'metal'
  | 'plexiglass'
  | 'aquatic_life'
  | 'canvas'
  | 'drywall'
  | 'hard_plastic'
  | 'vinyl'
  | 'soft_plastic'
  | 'leather'
  | 'rubber'
  | 'concreate'
  | 'paint'
  | 'electronics'
  | 'fiber_natural'
  | 'gas'
  | 'fabric_synthetic'
  | 'CITES'
  | 'liquids'
  | 'salts';

export type ObjectSubType =
  | 'painting_unframed'
  | 'painting_framed'
  | 'painting_framed_plexi'
  | 'painting_framed_glass'
  | 'work_on_paper_unframed'
  | 'work_on_paper_framed'
  | 'work_on_paper_framed_plexi'
  | 'work_on_paper_framed_glass'
  | 'mixed_media_unframed'
  | 'mixed_media_framed'
  | 'mixed_media_framed_plexi'
  | 'mixed_media_framed_glass'
  | 'photograph_unframed'
  | 'photograph_framed'
  | 'photograph_framed_plexi'
  | 'photograph_framed_glass'
  | 'new_media'
  | 'sculpture'
  | 'pedestal'
  | 'pedestal_case_glass'
  | 'pedestal_case_plexi'
  | 'ceramic'
  | 'neon'
  | 'tapestry'
  | 'other_art'
  | 'table'
  | 'chair'
  | 'sofa_loveseat_chaise'
  | 'floor_lamp'
  | 'floor_lamp_shade'
  | 'table_lamp'
  | 'table_lamp_shade'
  | 'sconce'
  | 'ottoman'
  | 'bookcase_storage'
  | 'nightstand'
  | 'armoire_dresser'
  | 'carpet_rug'
  | 'mirror'
  | 'chandelier'
  | 'bedframe'
  | 'headboard'
  | 'desk_vanity'
  | 'media_console'
  | 'other_furniture'
  | 'earrings'
  | 'necklace'
  | 'bracelet'
  | 'ring'
  | 'brooch'
  | 'watch'
  | 'cufflinks'
  | 'eyeglasses'
  | 'set'
  | 'precious_stones'
  | 'snuff_box_cigarette_case'
  | 'other_jewelry'
  | 'vase_vessel'
  | 'bowl'
  | 'plaque'
  | 'object_of_vertu'
  | 'candelabra_candlestick'
  | 'dinnerware'
  | 'flatware'
  | 'glassware'
  | 'serveware'
  | 'porcelain_plate'
  | 'porcelain_bowl'
  | 'tabletop_accessory'
  | 'clock'
  | 'other_decorative_arts'
  | 'stamp'
  | 'book'
  | 'coin'
  | 'document_manuscript'
  | 'toy'
  | 'miniature_model'
  | 'figurine_doll'
  | 'neon_sign'
  | 'memorabilia'
  | 'camera_electrical'
  | 'other_collectibles'
  | 'wine_bottle'
  | 'spirits_bottle'
  | 'beer_bottle'
  | 'wine_case'
  | 'spirits_case'
  | 'beer_case'
  | 'wine_barrel'
  | 'spirits_barrel'
  | 'beer_barrel'
  | 'other_alcohols'
  | 'car'
  | 'motorcycle'
  | 'bus'
  | 'van'
  | 'limousine'
  | 'carriage'
  | 'trailer'
  | 'sidecar'
  | 'other_automotive'
  | 'clothing'
  | 'footwear'
  | 'handbag'
  | 'accessories'
  | 'other_fashion'
  | 'musical_instrument'
  | 'firearm_weapon'
  | 'hunting_fishing'
  | 'medical_equipment'
  | 'other';

export type SupportedCurrency = 'CAD' | 'EUR' | 'GBP' | 'HKD' | 'USD';

export interface Contact {
  name: string;
  email_address?: string | null;
  phone_number?: string | null;
}

export interface ArtaLocation {
  access_restrictions?: AccessRestriction[] | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  address_line_3?: string | null;
  city?: string | null;
  region?: string | null;
  postal_code?: string | null;
  country: string;
  title?: string | null;
  contacts?: Contact[] | null;
}

export type Details = {
  materials?: ObjectMaterial[] | null;
  creation_date?: string | null;
  creator?: string | null;
  notes?: string | null;
  title?: string | null;
  is_fragile?: boolean | null;
  is_cites?: boolean | null;
};

export interface ArtaObject {
  internal_reference?: string | null;
  current_packing?: PackingSubType[] | null;
  details?: Details | null;
  height: number | string;
  width: number | string;
  weight?: number | string | null;
  value: number | string;
  depth?: number | string | null;
  images?: string[] | null;
  public_reference?: string;
  subtype: ObjectSubType;
  unit_of_measurement?: string | null;
  weight_unit?: string | null;
  value_currency: SupportedCurrency;
}
