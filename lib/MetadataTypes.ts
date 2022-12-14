export type Nullable<T> = T | null;
export type NullableString = Nullable<string>;

export type AdditionalService =
  | 'assembly'
  | 'debris_disposal'
  | 'deinstallation'
  | 'destination_additional_labor'
  | 'destination_building_coi'
  | 'destination_condition_check'
  | 'destination_full_condition_report'
  | 'destination_unpacking'
  | 'double_blind_bols'
  | 'installation'
  | 'origin_building_coi'
  | 'origin_condition_check'
  | 'origin_full_condition_report'
  | 'placement'
  | 'signature_delivery'
  | 'tarmac_supervision';

export type AccessRestriction =
  | 'elevator_only'
  | 'freight_elevator'
  | 'loading_dock'
  | 'loading_dock_low'
  | 'low_clearance'
  | 'non_paved'
  | 'stairs_only'
  | 'steep_gradient';

export type Insurance = 'arta_transit_insurance' | 'no_arta_insurance';
export type PaymentProcessType = 'checkout' | 'checkout_direct' | 'invoicing';
export type QuoteType = 'parcel' | 'premium' | 'select' | 'self_ship';
export type QuoteRequestStatus =
  | 'cancelled'
  | 'closed'
  | 'disqualified'
  | 'expired'
  | 'in_progress'
  | 'pending'
  | 'quoted';

export type EmailNotificationId =
  | 'booking'
  | 'cancelled'
  | 'collected'
  | 'collection'
  | 'complete'
  | 'custom_quoted_dashboard'
  | 'in_transit'
  | 'invoice'
  | 'self_ship_label'
  | 'payment'
  | 'scheduling'
  | 'eei';

export type Recipients = 'payer' | 'origin' | 'destination';

export type MimeType =
  | 'application/pdf'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'image/jpeg'
  | 'image/png'
  | 'text/csv'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/msword';

export type DocumentType =
  | 'bill_of_lading'
  | 'certificate_of_insurance'
  | 'certificate_of_insurance_template'
  | 'condition_report'
  | 'condition_check'
  | 'image'
  | 'instructions'
  | 'airway_bill'
  | 'commercial_invoice'
  | 'power_of_attorney'
  | 'proof_of_export'
  | 'proof_of_delivery'
  | 'quote'
  | 'shipping_label'
  | 'other';

export type PackingType =
  | 'alcohol_case'
  | 'blanket'
  | 'box'
  | 'cbin_closed'
  | 'cbin_open'
  | 'crate'
  | 'foam_lined_box'
  | 'frame'
  | 'lockbox'
  | 'no_packing'
  | 'pallet'
  | 'portfolio'
  | 'rug_roll'
  | 'shadow_box'
  | 'slipcase'
  | 'soft_packing'
  | 'soft_wrap'
  | 'sonotube'
  | 'stabilizing_box'
  | 'tube';

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

export type ObjectType =
  | 'art'
  | 'furniture'
  | 'jewelry'
  | 'decorative_arts'
  | 'collectibles'
  | 'alcohol'
  | 'automotive'
  | 'fashion'
  | 'other';

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

export type ParcelTransportServices =
  | 'economy'
  | 'economy_freight'
  | 'ground'
  | 'next_day_air'
  | 'priority'
  | 'priority_freight'
  | 'second_day_air'
  | 'standard';

export type WebhookDeliveryType =
  | 'request.created'
  | 'request.status.updated'
  | 'shipment.created'
  | 'shipment.eei_form_status.updated'
  | 'shipment.schedule.updated'
  | 'shipment.status.updated'
  | 'shipment.tracking.updated'
  | 'ping';

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

export type ArtaTrackingServiceType =
  | 'transport'
  | 'location'
  | 'handling'
  | 'packing'
  | 'storage'
  | 'administration'
  | 'taxes_duties_fees'
  | 'security'
  | 'equipment';

export type ArtaTrackingServiceSubType =
  | 'specialized'
  | 'consolidated'
  | 'freight'
  | 'parcel'
  | 'collection'
  | 'delivery'
  | 'location'
  | 'unpacking'
  | 'condition'
  | 'installation'
  | 'deinstallation'
  | 'debris_disposal'
  | 'site_visit'
  | 'handling'
  | 'packing'
  | 'packing_materials'
  | 'receive_release'
  | 'warehouse'
  | 'customs'
  | 'coi'
  | 'administration'
  | 'taxes_duties'
  | 'fees'
  | 'security'
  | 'equipment';

export type ArtaTrackingServiceSubSubType =
  | 'armored_transport'
  | 'dedicated_transport'
  | 'specialized_shuttle'
  | 'road_groupage'
  | 'sea_groupage'
  | 'sea_freight'
  | 'ltl_freight'
  | 'ftl_freight'
  | 'air_freight'
  | 'cargo_air_freight'
  | 'parcel'
  | 'priority_freight'
  | 'economy_freight'
  | 'collection'
  | 'art_fair_collection'
  | 'residential_collection'
  | 'airport_collection'
  | 'port_collection'
  | 'dock_collection'
  | 'consolidated_collection'
  | 'failed_collection'
  | 'recollection'
  | 'delivery'
  | 'inside_delivery'
  | 'art_fair_delivery'
  | 'room_of_choice_delivery'
  | 'curbside_delivery'
  | 'residential_delivery'
  | 'signature_delivery'
  | 'saturday_delivery'
  | 'sunday_delivery'
  | 'scheduled_delivery'
  | 'after_hours_delivery'
  | 'airport_delivery'
  | 'port_delivery'
  | 'dock_delivery'
  | 'failed_delivery'
  | 'redelivery'
  | 'origin_additional_stops'
  | 'destination_additional_stops'
  | 'origin_off_route'
  | 'destination_off_route'
  | 'must_fly'
  | 'origin_unpacking_soft'
  | 'destination_unpacking_soft'
  | 'origin_unpacking_wood'
  | 'destination_unpacking_wood'
  | 'origin_unpacking'
  | 'destination_unpacking'
  | 'origin_full_condition_report'
  | 'destination_full_condition_report'
  | 'origin_condition_check'
  | 'destination_condition_check'
  | 'installation'
  | 'placement'
  | 'assembly'
  | 'deinstallation'
  | 'disassembly'
  | 'debris_disposal'
  | 'crate_disposal'
  | 'soft_packed_disposal'
  | 'origin_site_visit'
  | 'destination_site_visit'
  | 'origin_additional_labor'
  | 'destination_additional_labor'
  | 'airport_handling'
  | 'origin_oversized_handling'
  | 'destination_oversized_handling'
  | 'origin_additional_stairs'
  | 'destination_additional_stairs'
  | 'packing_labor'
  | 'crate_fabrication'
  | 't_frame_fabrication'
  | 'fabrication'
  | 'retrofitting'
  | 'additional_packing'
  | 'pack_into'
  | 'poly'
  | 'dartek'
  | 'bubble'
  | 'cling_wrap'
  | 'cbin_communal'
  | 'blanket'
  | 'portfolio'
  | 'poly_cardboard'
  | 'bubble_cardboard'
  | 'rug_rolled'
  | 'cbin_closed'
  | 'cbin_open'
  | 'garment_bag'
  | 'wardrobe_box'
  | 'cardboard_box'
  | 'chandelier_box'
  | 'chair_box'
  | 'slipcase'
  | 'glass_tape'
  | 'stabilizing_box'
  | 'shadow_box'
  | 'foam_lined_box'
  | 'cavity_box'
  | 'strongbox'
  | 'double_box'
  | 'shipping_tube_small'
  | 'shipping_tube_large'
  | 'sonotube'
  | 'alcohol_case'
  | 'lay_flat_wine_box'
  | 'lockbox'
  | 'travel_frame'
  | 'travel_frame_art'
  | 'travel_frame_other'
  | 'a_frame'
  | 'slat_crate'
  | 'tri_wall_crate'
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
  | 'pallet'
  | 'international_pallet'
  | 'warehouse_handling'
  | 'receive_in_fee'
  | 'release_fee'
  | 'storage'
  | 'temp_storage'
  | 'viewing_room'
  | 'staging'
  | 'import_customs_formalities'
  | 'export_customs_formalities'
  | 'origin_building_coi'
  | 'destination_building_coi'
  | 'double_blind_bols'
  | 'power_of_attorney'
  | 'administrative'
  | 'mpf'
  | 'bond'
  | 'duties'
  | 'taxes'
  | 'disbursement'
  | 'temporary_customs_entry'
  | 'fuel_surcharge'
  | 'tarmac_supervision'
  | 'courier_onboard'
  | 'fork_lift'
  | 'gantry'
  | 'pallet_jack'
  | 'scaffolding'
  | 'rigging'
  | 'lift_gate'
  | 'ramp'
  | 'floor_protection';

export type DisqualificationReasonCode =
  | 'external_service_unavailable'
  | 'client_timeout_reached';

export type PackageStatus =
  | 'pending'
  | 'transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'unknown'
  | 'notfound'
  | 'undelivered'
  | 'exception'
  | 'expired';

export type EEIFormStatus =
  | 'pending'
  | 'cleared'
  | 'approved'
  | 'rejected'
  | 'submitted';

export type ShipmentStatus =
  | 'pending'
  | 'confirmed'
  | 'collected'
  | 'in_transit'
  | 'completed';

export type WebhookResourceType = 'ping' | 'request' | 'shipment';

export type WebhookDeliveryStatus = 'delivered' | 'failed';

export type PaymentContext = 'hosted_checkout' | 'invoiced';

export type SupportedCurrency = 'CAD' | 'EUR' | 'GBP' | 'HKD' | 'USD';

export type AuthTypes = 'api_key';

export type APIStatus = 'active' | 'beta' | 'deprecated';

export interface Contact {
  name: string;
  email_address?: NullableString;
  phone_number?: NullableString;
}

export interface ArtaLocation {
  access_restrictions?: Nullable<AccessRestriction[]>;
  address_line_1?: NullableString;
  address_line_2?: NullableString;
  address_line_3?: NullableString;
  city?: NullableString;
  region?: NullableString;
  postal_code?: NullableString;
  country: string;
  title?: NullableString;
  contacts?: Nullable<Contact[]>;
  estimated_country?: string;
  estimated_region?: string;
  estimated_city?: string;
}

export type Details = {
  materials?: Nullable<ObjectMaterial[]>;
  creation_date?: NullableString;
  creator?: NullableString;
  notes?: NullableString;
  title?: NullableString;
  is_fragile?: Nullable<boolean>;
  is_cites?: Nullable<boolean>;
};

export interface ArtaObject {
  internal_reference?: NullableString;
  current_packing?: Nullable<PackingSubType[]>;
  details?: Nullable<Details>;
  height: number | string;
  width: number | string;
  weight?: Nullable<number | string>;
  value: number | string;
  depth?: Nullable<number | string>;
  images?: Nullable<string[]>;
  public_reference?: string;
  subtype: ObjectSubType;
  unit_of_measurement?: NullableString;
  weight_unit?: NullableString;
  value_currency: SupportedCurrency;
}

export interface Disqualification {
  quote_types: QuoteType[];
  reason?: NullableString;
  reason_code: DisqualificationReasonCode;
}

export interface InsurancePolicy {
  amount: number;
  amount_currency: SupportedCurrency;
  id: string;
  insured_value: number;
  insured_value_currency: SupportedCurrency;
}

export interface ArtaService {
  amount: number;
  amount_currency: SupportedCurrency;
  included_services: ArtaService[];
  is_requested: boolean;
  is_required: boolean;
  name: string;
  sub_subtype: ArtaTrackingServiceSubSubType;
  subtype: ArtaTrackingServiceSubType;
  type: ArtaTrackingServiceType;
}

export interface Quote {
  id: number;
  included_services: ArtaService[];
  included_insurance_policy?: Nullable<InsurancePolicy>;
  optional_services: ArtaService[];
  quote_type: QuoteType;
  status: string;
  total: number;
  total_currency: SupportedCurrency;
}
