Blocks.payloadSource.buildVisibility = BuildVisibility.shown;
Blocks.itemSource.buildVisibility = BuildVisibility.shown;
Blocks.powerSource.buildVisibility = BuildVisibility.shown;
Blocks.payloadVoid.buildVisibility = BuildVisibility.shown;
Blocks.itemVoid.buildVisibility = BuildVisibility.shown;
Blocks.powerVoid.buildVisibility = BuildVisibility.shown;
Blocks.liquidSource.buildVisibility = BuildVisibility.shown;
Blocks.liquidVoid.buildVisibility = BuildVisibility.shown;
Blocks.heatSource.buildVisibility = BuildVisibility.shown;

require('super-cheat/chrono-unloader')
require('super-cheat/chrono-pusher')
require('super-cheat/next-wave')

const units = [UnitTypes.alpha,UnitTypes.beta,UnitTypes.gamma];
units.forEach(e=>e.abilities.add(UnitTypes.renale.abilities.get(0)));
UnitTypes.alpha.abilities.get(0).percentAmount = 0.0417 * 1000;
UnitTypes.beta.abilities.get(0).percentAmount = 0.0556 * 1000;
UnitTypes.gamma.abilities.get(0).percentAmount = 0.0834 * 1000;

Events.on(ClientLoadEvent, () => {
    Time.run(10, () => { // tunda sedikit agar semua mod termuat
        Vars.content.blocks().each(block => {
            block.unlocked = true;
            block.alwaysUnlocked = true;
            block.buildVisibility = BuildVisibility.shown;
        });

        Vars.content.techTree.each(node => {
            node.content.unlocked = true;
            node.content.alwaysUnlocked = true;
        });

        Vars.ui.showInfoToast("Semua blok (termasuk dari mod) telah dibuka!", 5);
    });
});
