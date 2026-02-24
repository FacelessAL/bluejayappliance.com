import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllServices,
  getServiceBySlug,
  getBusiness,
  getAllLocations,
} from '@/lib/data';
import { linkifyBody } from '@/lib/linkifyPhone';
import ServiceSidebar from '@/components/ServiceSidebar';
import TestimonialSection from '@/components/TestimonialSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

function getServiceIssues(slug: string): Array<{ issue: string; description: string }> {
  const issues: Record<string, Array<{ issue: string; description: string }>> = {
    'dishwasher-repair': [
      { issue: 'Not Draining', description: 'Water pooling at the bottom after a cycle usually points to a clogged drain hose, faulty drain pump, or blocked air gap. Our technicians identify the exact cause and clear or replace the affected part.' },
      { issue: 'Leaking Water', description: 'Leaks from the door, underneath, or around connections can result from a worn door gasket, cracked hose, or loose fitting. We pinpoint the source and fix it to prevent water damage to your flooring.' },
      { issue: 'Dishes Not Getting Clean', description: 'Poor cleaning performance is often caused by a malfunctioning spray arm, worn wash motor, clogged filter, or faulty detergent dispenser. We restore full cleaning power on the first visit.' },
      { issue: 'Won\'t Start or Complete a Cycle', description: 'If your dishwasher won\'t start, stops mid-cycle, or skips stages, the issue may be the door latch, control board, timer, or thermal fuse. We diagnose and repair all electronic and mechanical start failures.' },
      { issue: 'Unusual Noises', description: 'Grinding, buzzing, or humming sounds during operation can indicate a failing wash motor, damaged impeller, or debris caught in the drain pump. We isolate the noise source and resolve it.' },
      { issue: 'Error Codes', description: 'Modern dishwashers display fault codes to help identify problems. Our technicians are trained on all major brand error code systems and can quickly translate codes into targeted repairs.' },
    ],
    'dryer-repair': [
      { issue: 'Not Heating', description: 'A dryer that tumbles but doesn\'t produce heat is usually caused by a burned-out heating element, faulty thermal fuse, broken gas igniter, or defective thermostat. We carry common replacement parts on our trucks.' },
      { issue: 'Takes Too Long to Dry', description: 'Extended drying times are often the result of a clogged lint filter or exhaust vent, worn drum seals allowing heat to escape, or a failing heating element operating below capacity.' },
      { issue: 'Making Loud Noises', description: 'Banging, squealing, or thumping sounds commonly come from worn drum rollers, a damaged belt, defective idler pulley, or foreign objects caught between the drum and housing.' },
      { issue: 'Won\'t Turn On', description: 'When your dryer is completely unresponsive, the cause is typically a failed start switch, blown thermal fuse, defective door switch, or a power supply issue. We test each component systematically.' },
      { issue: 'Drum Not Spinning', description: 'A dryer that heats but won\'t tumble usually has a broken drive belt, seized drum rollers, or a worn motor coupling. Belt replacement is one of the most common dryer repairs we perform.' },
      { issue: 'Burning Smell', description: 'A burning odor is a serious safety concern often caused by lint buildup inside the cabinet, a slipping belt, or overheating components. We clean, inspect, and repair to eliminate fire risks.' },
    ],
    'washer-repair': [
      { issue: 'Won\'t Drain or Spin', description: 'When water remains in the tub or the spin cycle fails, the culprit is usually a clogged drain pump, faulty lid switch (top-loaders), worn drive coupler, or a failed motor coupling.' },
      { issue: 'Excessive Vibration or Shaking', description: 'Violent shaking during the spin cycle is commonly caused by unbalanced loads, worn shock absorbers or suspension springs, leveling issues, or a damaged tub bearing.' },
      { issue: 'Leaking Water', description: 'Leaks can originate from damaged door boots (front-loaders), cracked tub seals, loose inlet hose connections, or a failing water pump. We trace the leak to its source and fix it.' },
      { issue: 'Won\'t Start', description: 'A completely unresponsive washer may have a failed timer, defective control board, bad lid or door switch, or a power supply problem. Our technicians test each component to find the fault.' },
      { issue: 'Not Filling With Water', description: 'If your washer won\'t fill or fills slowly, common causes include clogged inlet screens, a faulty water inlet valve, low water pressure, or problems with the water level sensor.' },
      { issue: 'Foul Odors', description: 'Musty or mildew smells in front-load washers are usually caused by mold buildup in the door gasket, residue in the tub, or a partially clogged drain. We deep-clean and address the root cause.' },
    ],
    'refrigerator-and-freezer-repair': [
      { issue: 'Not Cooling Properly', description: 'Insufficient cooling can be caused by dirty condenser coils, a malfunctioning compressor, failed evaporator fan, low refrigerant, or a defective thermostat. We diagnose the exact issue and restore proper temperature.' },
      { issue: 'Freezer Not Freezing', description: 'When the freezer can\'t maintain temperature, common causes include a defrost system failure, sealed system leak, faulty evaporator fan, or a stuck defrost timer preventing proper cycling.' },
      { issue: 'Water Leaking', description: 'Interior puddles or water on the floor often result from a clogged defrost drain, cracked drain pan, leaking water supply line, or a failed inlet valve for the ice maker.' },
      { issue: 'Ice Maker Not Working', description: 'Ice maker failures are commonly caused by a frozen water line, faulty inlet valve, defective ice maker module, or temperature issues in the freezer. We repair or replace the affected components.' },
      { issue: 'Strange Noises', description: 'Buzzing, clicking, or rattling sounds may indicate a failing compressor, loose condenser fan, defective evaporator fan motor, or expansion/contraction of internal components.' },
      { issue: 'Frost Buildup', description: 'Excessive frost on the back wall or around the freezer is usually a defrost system problem — the heater, thermostat, or timer may have failed, preventing the automatic defrost cycle.' },
    ],
    'stove-and-oven-repair': [
      { issue: 'Oven Not Heating', description: 'An oven that won\'t reach temperature typically has a burned-out bake or broil element (electric), a faulty gas igniter (gas), a defective oven sensor, or a malfunctioning control board.' },
      { issue: 'Burners Not Igniting', description: 'Gas burners that click but won\'t light or produce a weak flame usually need igniter replacement, gas valve repair, or cleaning of clogged burner ports. We also check gas line connections.' },
      { issue: 'Uneven Heating', description: 'Hot spots or inconsistent baking results often point to a failing oven sensor, malfunctioning convection fan, worn door gasket allowing heat escape, or calibration issues.' },
      { issue: 'Door Won\'t Close Properly', description: 'A misaligned or stuck oven door is commonly caused by bent or broken hinges, a worn door gasket, or a faulty door latch mechanism. Proper sealing is essential for consistent cooking.' },
      { issue: 'Self-Clean Issues', description: 'If the self-clean cycle won\'t start or complete, the cause may be a defective door lock mechanism, failed thermal fuse, or control board malfunction. We repair all self-cleaning system components.' },
      { issue: 'Control Panel Problems', description: 'Unresponsive buttons, flickering displays, or erratic oven behavior often indicate a failing control board, loose wiring, or damaged membrane switch. We replace and reprogram as needed.' },
    ],
    'range-repair': [
      { issue: 'Burners Not Working', description: 'Whether gas or electric, non-functioning burners can be caused by faulty igniters, bad infinite switches, damaged coil elements, or wiring issues. We repair both gas and electric range burners.' },
      { issue: 'Temperature Inaccuracy', description: 'If your range oven runs too hot or too cold, the issue is often a failing oven sensor, miscalibrated thermostat, or control board problem. We recalibrate or replace the affected components.' },
      { issue: 'Gas Ignition Problems', description: 'Repeated clicking, delayed ignition, or gas smell without a flame are serious issues requiring immediate attention. We inspect and repair gas igniters, safety valves, and spark modules.' },
      { issue: 'Electrical Control Issues', description: 'Digital display failures, unresponsive touchpads, or intermittent power problems typically point to a failing control board, damaged wiring harness, or defective clock/timer assembly.' },
      { issue: 'Broiler Not Working', description: 'A non-functioning broiler in a gas range usually means a bad broil igniter or gas valve issue. In electric ranges, it\'s typically a burned-out broil element or wiring fault.' },
      { issue: 'Door or Hinge Problems', description: 'Difficult-to-open range doors, doors that don\'t stay closed, or self-clean lock failures are usually caused by broken hinges, worn springs, or a defective door latch mechanism.' },
    ],
    'garbage-disposal-repair-and-installation': [
      { issue: 'Humming But Not Grinding', description: 'A disposal that hums without grinding is usually jammed. An object may be stuck between the impellers and the shredder ring, or the motor capacitor may have failed. We safely clear jams and restore operation.' },
      { issue: 'Complete Unit Failure', description: 'When the disposal is completely silent, the issue is often a tripped reset button, blown circuit breaker, failed wall switch, or a burned-out motor that needs replacement.' },
      { issue: 'Leaking', description: 'Leaks can occur at the sink flange (top), dishwasher connection (side), or drain pipe (bottom). We identify the exact leak point and re-seal or replace the failing connection.' },
      { issue: 'Loud Grinding Noises', description: 'Metallic or harsh grinding sounds indicate foreign objects inside the unit, worn impellers, or loose mounting hardware causing the unit to vibrate against the sink.' },
      { issue: 'Slow Draining', description: 'Poor drainage through the disposal is usually caused by food buildup in the drain pipe, a partially clogged P-trap, or worn grinding components that can\'t break down food effectively.' },
      { issue: 'New Installation Needed', description: 'Whether you\'re replacing an old unit or installing a disposal for the first time, we handle the complete job — electrical connections, plumbing, mounting hardware, and testing.' },
    ],
  };
  return issues[slug] || [];
}

function getServiceBrands(slug: string): string[] {
  const brands: Record<string, string[]> = {
    'dishwasher-repair': ['Bosch', 'KitchenAid', 'Whirlpool', 'GE', 'Maytag', 'Samsung', 'LG', 'Frigidaire', 'Miele', 'Kenmore', 'Amana', 'Beko'],
    'dryer-repair': ['Whirlpool', 'Maytag', 'Samsung', 'LG', 'GE', 'Kenmore', 'Frigidaire', 'Amana', 'Speed Queen', 'Bosch', 'Electrolux'],
    'washer-repair': ['Whirlpool', 'Maytag', 'Samsung', 'LG', 'GE', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Amana', 'Bosch', 'Electrolux'],
    'refrigerator-and-freezer-repair': ['Whirlpool', 'GE', 'Samsung', 'LG', 'Frigidaire', 'KitchenAid', 'Kenmore', 'Maytag', 'Sub-Zero', 'Viking', 'Thermador', 'Amana'],
    'stove-and-oven-repair': ['GE', 'Whirlpool', 'Samsung', 'LG', 'Frigidaire', 'KitchenAid', 'Maytag', 'Bosch', 'Viking', 'Wolf', 'Thermador', 'Kenmore'],
    'range-repair': ['GE', 'Whirlpool', 'Samsung', 'LG', 'Frigidaire', 'KitchenAid', 'Maytag', 'Bosch', 'Viking', 'Wolf', 'Thermador', 'Kenmore'],
    'garbage-disposal-repair-and-installation': ['InSinkErator', 'Waste King', 'GE', 'KitchenAid', 'Moen', 'Whirlpool', 'Frigidaire', 'Kenmore'],
  };
  return brands[slug] || [];
}

function getServiceProcess(slug: string): Array<{ step: string; detail: string }> {
  const processes: Record<string, Array<{ step: string; detail: string }>> = {
    'dishwasher-repair': [
      { step: 'Describe the Symptoms', detail: 'Call us at (630) 998-0209 and tell us what\'s happening — leaking, not draining, error codes, or anything else. We\'ll schedule a same or next-day visit.' },
      { step: 'Run Diagnostic Cycles', detail: 'Our technician runs your dishwasher through a diagnostic cycle, checks water supply and drain lines, tests the door latch, and inspects internal components to pinpoint the failure.' },
      { step: 'Review Your Written Estimate', detail: 'We present a clear, itemized estimate covering parts and labor. You see the exact cost before we touch a single component.' },
      { step: 'Complete the Repair', detail: 'Most dishwasher repairs — pump replacements, gasket swaps, control board fixes — are completed in one visit with parts from our truck.' },
      { step: 'Verify & Warranty', detail: 'We run a full wash cycle to confirm everything works properly, then back the repair with our 90-day parts and labor warranty.' },
    ],
    'dryer-repair': [
      { step: 'Tell Us What\'s Wrong', detail: 'Call (630) 998-0209 and describe the issue — no heat, strange noises, won\'t start, or long dry times. We\'ll book a same or next-day appointment.' },
      { step: 'Inspect & Test Components', detail: 'Our tech checks the heating element or gas igniter, thermal fuse, thermostat, belt, drum rollers, and exhaust vent to isolate the exact failure point.' },
      { step: 'Get an Upfront Price', detail: 'Before starting, you receive a written estimate with no hidden charges. We explain what failed and why, so you can make an informed decision.' },
      { step: 'Repair on the Spot', detail: 'We carry common dryer parts — heating elements, belts, thermal fuses, igniters — for fast same-visit repair on most models.' },
      { step: 'Safety Check & Warranty', detail: 'We verify proper heating, drum operation, and airflow before leaving. Every dryer repair includes our 90-day parts and labor warranty.' },
    ],
    'washer-repair': [
      { step: 'Describe the Problem', detail: 'Call (630) 998-0209 and let us know what\'s happening — won\'t drain, shaking violently, leaking, or error codes. We schedule around your availability.' },
      { step: 'Diagnose the Failure', detail: 'Our technician inspects the pump, motor coupling, lid or door switch, tub bearings, inlet valves, and control board to identify the root cause.' },
      { step: 'Approve the Written Estimate', detail: 'We provide an itemized, written estimate before any work begins. No surprises, no pressure — you decide whether to proceed.' },
      { step: 'Fix It Right', detail: 'Common washer repairs like pump replacements, bearing swaps, and switch fixes are typically completed on the first visit with parts we carry.' },
      { step: 'Test Cycles & Warranty', detail: 'We run your washer through fill, wash, and spin cycles to confirm the repair. Everything is backed by our 90-day parts and labor warranty.' },
    ],
    'refrigerator-and-freezer-repair': [
      { step: 'Report the Issue', detail: 'Call (630) 998-0209 with details — not cooling, ice maker down, leaking, or unusual noises. Cooling emergencies get same-day priority scheduling.' },
      { step: 'Precision Temperature Diagnosis', detail: 'Our tech measures temperatures at multiple points, tests the compressor, evaporator and condenser fans, defrost system, thermostat, and sealed system pressures.' },
      { step: 'Review the Written Quote', detail: 'We explain the diagnosis in plain language and provide a detailed written estimate. You see the exact cost and approve it before we start.' },
      { step: 'Restore Cooling', detail: 'From relay swaps and fan motor replacements to defrost system repairs, most refrigerator fixes are completed the same day.' },
      { step: 'Confirm Temps & Warranty', detail: 'We verify the unit reaches proper temperature and all systems function correctly. Your repair is covered by our 90-day parts and labor warranty.' },
    ],
    'stove-and-oven-repair': [
      { step: 'Describe the Cooking Issue', detail: 'Call (630) 998-0209 and tell us what\'s happening — burners won\'t light, oven not heating, temperature swings, or error codes. Same or next-day appointments available.' },
      { step: 'Gas & Electrical Safety Check', detail: 'Our gas-certified technician checks ignition systems, gas connections, heating elements, oven sensors, and control boards while verifying safe operation throughout.' },
      { step: 'Get Your Written Estimate', detail: 'We present a clear estimate covering the specific repair — igniter replacement, element swap, sensor calibration, or control board fix — before any work starts.' },
      { step: 'Complete the Repair Safely', detail: 'We perform the repair, verify all gas connections are tight and leak-free (gas models), and test element continuity on electric models.' },
      { step: 'Verify Temperatures & Warranty', detail: 'We test burner ignition, oven temperature accuracy, and overall safe operation. Every repair is backed by our 90-day warranty on parts and labor.' },
    ],
    'range-repair': [
      { step: 'Explain the Range Problem', detail: 'Call (630) 998-0209 with details on your range issue — cooktop or oven side, gas or electric, and the specific symptoms. We\'ll schedule a convenient appointment.' },
      { step: 'Dual-System Inspection', detail: 'Since ranges combine a cooktop and oven, our tech inspects both systems independently — testing burners, igniters, elements, sensors, gas valves, and the control board.' },
      { step: 'Approve the Itemized Estimate', detail: 'We explain which component failed and provide a written estimate before starting. For dual-fuel ranges, we detail exactly which system needs attention.' },
      { step: 'Expert Range Repair', detail: 'We repair the cooktop, oven, or both — handling gas igniters, electric elements, thermostats, and control issues with the right parts for your specific model.' },
      { step: 'Full Function Test & Warranty', detail: 'We test every burner and the oven at temperature to confirm full operation. All range repairs are covered by our 90-day parts and labor warranty.' },
    ],
    'garbage-disposal-repair-and-installation': [
      { step: 'Tell Us What Happened', detail: 'Call (630) 998-0209 and describe the issue — humming, jammed, leaking, or silent. If you need a new installation, let us know and we\'ll bring the right unit.' },
      { step: 'Inspect the Disposal & Plumbing', detail: 'Our tech checks the motor, impellers, mounting assembly, plumbing connections, electrical wiring, and dishwasher drain hookup to find the problem.' },
      { step: 'Repair or Replace Recommendation', detail: 'We give you an honest assessment — if the disposal can be repaired affordably, we\'ll quote it. If replacement makes more sense, we\'ll recommend the right size and model.' },
      { step: 'Same-Visit Resolution', detail: 'Whether it\'s clearing a jam, fixing a leak, or installing a brand-new unit with all plumbing and electrical connections — most disposal jobs are done in one visit.' },
      { step: 'Test & Warranty', detail: 'We run the disposal with water flowing to confirm smooth operation and no leaks. Repairs and new installations are covered by our 90-day warranty.' },
    ],
  };
  return processes[slug] || [
    { step: 'Call & Schedule', detail: 'Call (630) 998-0209 to describe the issue and book a same or next-day appointment.' },
    { step: 'Diagnosis', detail: 'Our technician inspects your appliance and identifies the exact problem.' },
    { step: 'Written Estimate', detail: 'You receive a clear, written estimate before any work begins.' },
    { step: 'Expert Repair', detail: 'We complete the repair using quality parts, usually on the first visit.' },
    { step: '90-Day Warranty', detail: 'Every repair is backed by our 90-day warranty on parts and labor.' },
  ];
}

function getServiceFAQs(slug: string): Array<{ question: string; answer: string }> {
  const faqs: Record<string, Array<{ question: string; answer: string }>> = {
    'dishwasher-repair': [
      { question: 'How much does dishwasher repair cost?', answer: 'The cost depends on the specific issue and parts needed. We provide a free, written estimate before any work begins so there are no surprises. Common repairs like replacing a door gasket or drain pump typically cost less than half the price of a new dishwasher.' },
      { question: 'Is it worth repairing an old dishwasher?', answer: 'If your dishwasher is less than 8-10 years old and the repair cost is under half the price of a new unit, repair is generally the smart choice. We\'ll give you an honest recommendation based on the age, condition, and repair cost.' },
      { question: 'What dishwasher brands do you service?', answer: 'We repair all major brands including Bosch, KitchenAid, Whirlpool, GE, Maytag, Samsung, LG, Frigidaire, Miele, Kenmore, and more. Our trucks carry common parts for faster same-day repairs.' },
      { question: 'How long does a dishwasher repair take?', answer: 'Most dishwasher repairs are completed in 1-2 hours on the first visit. If a specialty part needs to be ordered, we\'ll schedule a follow-up as soon as it arrives — typically within 1-3 business days.' },
      { question: 'My dishwasher is leaving a white film on glasses. Can you fix that?', answer: 'Yes. A white film is often caused by hard water deposits, a malfunctioning rinse aid dispenser, or incorrect water temperature. We diagnose the root cause and resolve it so your dishes come out spotless.' },
    ],
    'dryer-repair': [
      { question: 'Why is my dryer not heating?', answer: 'The most common causes are a burned-out heating element (electric dryers), faulty gas igniter (gas dryers), blown thermal fuse, or defective thermostat. Our technicians carry these parts on our trucks for fast same-day repair.' },
      { question: 'How much does dryer repair cost?', answer: 'Repair costs vary depending on the issue. We provide a clear, written estimate before starting work. Most common repairs cost significantly less than buying a new dryer.' },
      { question: 'Do you repair both gas and electric dryers?', answer: 'Yes, we service both gas and electric dryers from all major manufacturers. Our technicians are trained and certified for gas appliance repairs, including igniter and gas valve work.' },
      { question: 'How often should I clean my dryer vent?', answer: 'We recommend professional dryer vent cleaning at least once a year. Clogged vents reduce efficiency, extend drying times, and are a leading cause of house fires. We can inspect your vent during any service call.' },
      { question: 'My dryer is making a loud banging noise. What\'s wrong?', answer: 'Banging or thumping noises are usually caused by worn drum support rollers, a damaged drive belt, or loose baffle/lifters inside the drum. These are straightforward repairs that we handle routinely.' },
    ],
    'washer-repair': [
      { question: 'Why won\'t my washing machine drain?', answer: 'Common causes include a clogged drain pump, kinked drain hose, failed lid switch (top-loaders), or a defective water pump. We diagnose the exact cause and resolve it, usually on the same visit.' },
      { question: 'Is it better to repair or replace a washing machine?', answer: 'If your washer is under 8 years old and the repair is less than 50% of a new unit\'s cost, repair is usually the best value. We give honest recommendations — if replacement makes more sense, we\'ll tell you.' },
      { question: 'Do you repair front-load and top-load washers?', answer: 'Yes, we repair both front-load and top-load washing machines, including high-efficiency (HE) models, stackable units, and compact washers. All major brands serviced.' },
      { question: 'Why does my washer shake violently during the spin cycle?', answer: 'Excessive vibration is typically caused by worn shock absorbers (front-load) or suspension springs (top-load), an unbalanced load, leveling issues, or a damaged tub bearing. We identify and fix the root cause.' },
      { question: 'My front-load washer smells like mildew. Can you fix that?', answer: 'Yes. Mildew odor is usually caused by mold buildup in the door gasket, residual detergent in the outer tub, or a partially clogged drain. We deep-clean affected areas and address the underlying cause to prevent recurrence.' },
    ],
    'refrigerator-and-freezer-repair': [
      { question: 'Why is my refrigerator not cold enough?', answer: 'Insufficient cooling can be caused by dirty condenser coils, a failing compressor, malfunctioning evaporator fan, defective thermostat, or a sealed system refrigerant leak. We diagnose the exact issue and restore proper temperature.' },
      { question: 'How much does refrigerator repair cost?', answer: 'Costs vary based on the issue. Simple fixes like replacing a thermostat or fan motor are very affordable. We provide a detailed written estimate before any work begins — no hidden fees.' },
      { question: 'Do you repair high-end refrigerator brands?', answer: 'Yes, we service all refrigerator brands from standard to luxury models including Sub-Zero, Viking, Thermador, KitchenAid, GE Monogram, and more.' },
      { question: 'My refrigerator is making a loud buzzing noise. Is it serious?', answer: 'A buzzing noise can indicate a failing compressor, loose condenser fan blade, or defective evaporator fan motor. While not always urgent, it\'s best to have it diagnosed promptly before the issue worsens.' },
      { question: 'How long does a refrigerator repair typically take?', answer: 'Most common repairs are completed in 1-2 hours on the first visit. If the compressor or sealed system needs work, it may take longer. We keep you informed throughout the process.' },
    ],
    'stove-and-oven-repair': [
      { question: 'Why won\'t my oven heat up?', answer: 'Common causes include a burned-out bake element (electric), faulty igniter (gas), defective oven sensor, or a malfunctioning control board. We diagnose and repair all oven heating issues.' },
      { question: 'Is it safe to use a gas stove with ignition problems?', answer: 'If you smell gas, stop using the appliance immediately and ventilate the area. For issues like delayed ignition or clicking without lighting, call us for a prompt repair — these are safety concerns that should be addressed quickly.' },
      { question: 'Do you repair glass/ceramic cooktops?', answer: 'Yes, we repair glass and ceramic cooktops including cracked surfaces, faulty burner elements, and touch-control issues. We also service induction cooktops.' },
      { question: 'My oven temperature seems off. Can you fix it?', answer: 'Yes. Temperature inaccuracy is usually caused by a failing oven sensor, miscalibrated thermostat, or worn door gasket allowing heat to escape. We recalibrate or replace components as needed.' },
      { question: 'How much does stove or oven repair cost?', answer: 'Costs depend on the specific issue. Igniter replacements and element swaps are affordable, while control board repairs may cost more. We always provide a written estimate before starting work.' },
    ],
    'range-repair': [
      { question: 'What\'s the difference between a range, stove, and cooktop?', answer: 'A range is a combination unit with both a cooktop and oven. A stove typically refers to the cooktop alone, and a cooktop is built into the countertop. We repair all three types.' },
      { question: 'Do you repair both gas and electric ranges?', answer: 'Yes, we service gas, electric, dual-fuel, and induction ranges from all major manufacturers. Our technicians are certified for gas appliance work.' },
      { question: 'Why does my gas range keep clicking?', answer: 'Continuous clicking after the burner is lit is usually caused by moisture in the igniter, food debris around the burner, or a faulty spark module. We clean, dry, and repair the ignition system.' },
      { question: 'My range oven takes forever to preheat. What\'s wrong?', answer: 'Slow preheating is often caused by a weak bake igniter (gas), failing heating element (electric), worn oven sensor, or heat loss through a damaged door gasket.' },
      { question: 'Can you repair a range with a cracked glass top?', answer: 'We can replace cracked glass cooktops on most range models. We source the correct replacement panel for your specific make and model and install it properly.' },
    ],
    'garbage-disposal-repair-and-installation': [
      { question: 'My garbage disposal is humming but not grinding. What\'s wrong?', answer: 'A humming disposal is usually jammed. An object may be stuck between the impellers and grinding ring. In some cases, the motor capacitor has failed. We safely clear jams and restore operation.' },
      { question: 'Is it better to repair or replace a garbage disposal?', answer: 'Disposals under 7 years old with minor issues (jams, slow grinding) are usually worth repairing. For older units, major motor failures, or persistent leaking, replacement is often more cost-effective. We\'ll advise honestly.' },
      { question: 'How long does garbage disposal installation take?', answer: 'A standard replacement installation takes 1-2 hours. New installations (where no disposal existed) may take slightly longer depending on the plumbing and electrical work required.' },
      { question: 'What size garbage disposal do I need?', answer: 'For most households, a 1/2 HP to 3/4 HP disposal is sufficient. Larger families or heavy cooks may benefit from a 1 HP unit. We can recommend the right size based on your usage.' },
      { question: 'Can I put anything down a garbage disposal?', answer: 'Avoid fibrous foods (celery, artichokes), grease/oil, bones, pasta/rice (they expand), and non-food items. We\'ll share care tips during your service visit to help extend your disposal\'s life.' },
    ],
  };
  return faqs[slug] || [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = service.metaTitle;
  const description = service.metaDescription;

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `${biz.url}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const locations = getAllLocations();
  const allServices = getAllServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug);
  const issues = getServiceIssues(service.slug);
  const brands = getServiceBrands(service.slug);
  const process = getServiceProcess(service.slug);
  const faqs = getServiceFAQs(service.slug);

  return (
    <>
      <SchemaMarkup
        type="Service"
        pageName={service.title}
        pageDescription={service.metaDescription}
        pageUrl={`${biz.url}/services/${service.slug}`}
        serviceType={service.schemaServiceType}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Services', url: `${biz.url}/services` },
          { name: service.title, url: `${biz.url}/services/${service.slug}` },
        ]}
        faqItems={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            style={{ opacity: 0.2 }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            {service.heroHeading}
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            {service.heroSubheading}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/contact-us"
              style={{ backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Schedule a Repair
            </Link>
            <Link
              href={`tel:${biz.phoneRaw}`}
              style={{ border: '2px solid #ffffff', color: '#ffffff', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Call {biz.phone}
            </Link>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-sidebar">
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Intro Content Sections */}
              {service.contentSections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                    {section.heading.replace(/\{city\}/g, biz.serviceAreaName).replace(/\{cityFull\}/g, biz.serviceAreaName).replace(/\{businessName\}/g, biz.name)}
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                    {linkifyBody(section.body.replace(/\{city\}/g, biz.serviceAreaName).replace(/\{cityFull\}/g, biz.serviceAreaName).replace(/\{businessName\}/g, biz.name).replace(/\{phoneSlogan\}/g, biz.phoneSlogan))}
                  </p>
                </div>
              ))}

              {/* Common Issues */}
              {issues.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                    Common {service.title} Problems We Fix
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                    {{
                      'dishwasher-repair': 'Dishwashers fail in predictable ways — and our technicians know every one of them. Here are the issues we diagnose and repair most often:',
                      'dryer-repair': 'Whether gas or electric, dryer problems share common patterns. Here are the failures our technicians encounter and resolve most frequently:',
                      'washer-repair': 'Washing machines — both top-load and front-load — develop recognizable symptoms when components fail. Here are the problems we fix regularly:',
                      'refrigerator-and-freezer-repair': 'Refrigerators and freezers can fail in ways that range from minor inconveniences to food-safety emergencies. Here are the issues we see and solve most often:',
                      'stove-and-oven-repair': 'Gas and electric stoves and ovens each have their own common failure points. Here are the issues our gas-certified technicians handle routinely:',
                      'range-repair': 'Ranges combine cooktop and oven systems, doubling the potential failure points. Here are the problems our technicians diagnose and repair most often:',
                      'garbage-disposal-repair-and-installation': 'Garbage disposals are simple but critical kitchen components. When they fail, here are the issues we see and resolve:',
                    }[service.slug] || `Here are the most common ${service.shortTitle.toLowerCase()} problems we diagnose and repair:`}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {issues.map((item, i) => (
                      <div key={i} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #1565C0' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '6px' }}>
                          {item.issue}
                        </h3>
                        <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Our Repair Process */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                  Our {service.title} Process
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  {{
                    'dishwasher-repair': 'Getting your dishwasher fixed should be as easy as loading the dishes. Here\'s how we handle every dishwasher service call:',
                    'dryer-repair': 'We keep dryer repair straightforward — no runaround, no mystery charges. Here\'s exactly what to expect:',
                    'washer-repair': 'From your first call to a fully functioning washer, here\'s how our washer repair process works step by step:',
                    'refrigerator-and-freezer-repair': 'When your fridge or freezer is down, speed matters. Here\'s how we handle cooling emergencies and routine repairs:',
                    'stove-and-oven-repair': 'We take extra care with stove and oven repairs because gas safety is paramount. Here\'s our process:',
                    'range-repair': 'Range repairs require attention to both the cooktop and oven systems. Here\'s how we approach every range service call:',
                    'garbage-disposal-repair-and-installation': 'Whether it\'s a quick repair or a full replacement, here\'s what our disposal service looks like:',
                  }[service.slug] || 'Here\'s how our repair process works from start to finish:'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {process.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div className="font-[family-name:var(--font-figtree)]" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1565C0', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>
                          {item.step}
                        </h3>
                        <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands We Service */}
              {brands.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                    Brands We Service
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                    {{
                      'dishwasher-repair': 'From budget-friendly Amana to premium Miele, we carry diagnostic tools and common parts for every dishwasher manufacturer:',
                      'dryer-repair': 'We service residential dryers from every major manufacturer — gas and electric, standard and high-efficiency:',
                      'washer-repair': 'Top-loaders, front-loaders, HE models, and compact units — we repair washing machines from all of these manufacturers:',
                      'refrigerator-and-freezer-repair': 'From everyday Whirlpool models to luxury Sub-Zero built-ins, our technicians are trained on every major refrigerator brand:',
                      'stove-and-oven-repair': 'We repair gas and electric stoves and ovens across the full spectrum of brands, from standard to professional-grade:',
                      'range-repair': 'Freestanding, slide-in, drop-in, pro-style — we service ranges from every major manufacturer in every configuration:',
                      'garbage-disposal-repair-and-installation': 'We repair and install units from every major disposal manufacturer, and carry InSinkErator and Waste King for same-day replacement:',
                    }[service.slug] || `We service ${service.shortTitle.toLowerCase()} from all major manufacturers:`}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {brands.map((brand, i) => (
                      <span key={i} style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-figtree)', border: '1px solid #bfdbfe' }}>
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Area Links */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                  {service.title} Near You
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  {{
                    'dishwasher-repair': `Blue Jay provides dishwasher repair across ${biz.serviceAreaName}. Click your city below to see local service details:`,
                    'dryer-repair': `Need a dryer technician in your area? We offer gas and electric dryer repair throughout ${biz.serviceAreaName}:`,
                    'washer-repair': `Washer problems don't wait — and neither do we. Find washing machine repair near you across ${biz.serviceAreaName}:`,
                    'refrigerator-and-freezer-repair': `Cooling emergencies get same-day priority across all of our service areas in ${biz.serviceAreaName}:`,
                    'stove-and-oven-repair': `Our gas-certified technicians provide stove and oven repair throughout ${biz.serviceAreaName}. Find service in your city:`,
                    'range-repair': `From slide-in ranges to pro-style units, we service every type across ${biz.serviceAreaName}. Find range repair near you:`,
                    'garbage-disposal-repair-and-installation': `Same-day disposal repair and new installations available across ${biz.serviceAreaName}. Select your city:`,
                  }[service.slug] || `We provide professional ${service.shortTitle.toLowerCase()} throughout ${biz.serviceAreaName}:`}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                  {locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}/${service.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '6px', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '14px', fontFamily: 'var(--font-poppins)', color: '#0F1B2D', fontWeight: 500 }}
                      className="hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    >
                      <svg width="14" height="14" fill="#1565C0" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {service.shortTitle} in {loc.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                  Other Appliance Repair Services
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  {{
                    'dishwasher-repair': `While you're getting your dishwasher fixed, ask about our other appliance repair services — we handle the full kitchen and laundry room.`,
                    'dryer-repair': `If your dryer is acting up, your washer might not be far behind. We repair every major household appliance:`,
                    'washer-repair': `Laundry appliances often age together. If your washer needs attention, your dryer might too. We service all major household appliances:`,
                    'refrigerator-and-freezer-repair': `A fridge problem sometimes reveals other appliance issues that have been easy to ignore. We can handle them all in one visit:`,
                    'stove-and-oven-repair': `Kitchen appliances take a beating. If your stove or oven needs repair, we can inspect and service your other appliances too:`,
                    'range-repair': `If your range needs attention, we can check on your other kitchen appliances during the same visit. We repair them all:`,
                    'garbage-disposal-repair-and-installation': `While we're under your sink, we can also take a look at your dishwasher or any other appliance that needs attention:`,
                  }[service.slug] || `${biz.shortName} provides comprehensive appliance repair beyond just ${service.title.toLowerCase()}:`}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      style={{ display: 'block', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#0F1B2D', fontSize: '14px', fontFamily: 'var(--font-poppins)', fontWeight: 600, border: '1px solid #e2e8f0' }}
                      className="hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                    {service.title} FAQ
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {faqs.map((faq, i) => (
                      <div key={i} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
                          {faq.question}
                        </h3>
                        <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Contact CTA */}
              <div style={{ backgroundColor: '#1565C0', borderRadius: '12px', padding: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Need a Repair?</h3>
                <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9, fontFamily: 'var(--font-poppins)' }}>Same or next-day service available</p>
                <Link
                  href={`tel:${biz.phoneRaw}`}
                  style={{ display: 'block', fontSize: '24px', fontWeight: 800, color: '#ffffff', textDecoration: 'none', marginBottom: '12px', fontFamily: 'var(--font-figtree)' }}
                >
                  {biz.phone}
                </Link>
                <Link
                  href="/contact-us"
                  style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#1565C0', padding: '10px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}
                >
                  Schedule Service
                </Link>
              </div>

              <ServiceSidebar currentServiceSlug={service.slug} currentServiceTitle={service.title} />
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
    </>
  );
}
