require('super-cheat/chrono-unloader');
require('super-cheat/chrono-pusher');
require('super-cheat/next-wave');

Events.on(ClientLoadEvent, () => {
    // Pertama atur blok sandbox agar terlihat
    const sandboxBlocks = [
        Blocks.payloadSource,
        Blocks.itemSource,
        Blocks.powerSource,
        Blocks.payloadVoid,
        Blocks.itemVoid,
        Blocks.powerVoid,
        Blocks.liquidSource,
        Blocks.liquidVoid,
        Blocks.heatSource
    ];

    sandboxBlocks.forEach(block => {
        if (block != null) {
            block.buildVisibility = BuildVisibility.shown;
            block.unlocked = true;
            block.alwaysUnlocked = true;
        }
    });

    Time.run(10, () => {
        Vars.content.blocks().each(block => {
            // Jangan timpa blok sandbox yang sudah kita atur
            if (block == null || block == Blocks.air || sandboxBlocks.includes(block)) return;

            block.unlocked = true;
            block.alwaysUnlocked = true;
            block.buildVisibility = BuildVisibility.shown;
        });

        if (Vars.content.techTree != null) {
            Vars.content.techTree.each(node => {
                if (node != null && node.content != null) {
                    node.content.unlocked = true;
                    node.content.alwaysUnlocked = true;
                }
            });
        }

        // Tambahkan ability jika renale tersedia
        const units = [UnitTypes.alpha, UnitTypes.beta, UnitTypes.gamma];
        const ability = UnitTypes.renale?.abilities?.get(0);
        if (ability != null) {
            units.forEach(unit => {
                unit.abilities.add(ability.copy());
            });

            UnitTypes.alpha.abilities.get(0).percentAmount = 0.0417 * 1000;
            UnitTypes.beta.abilities.get(0).percentAmount = 0.0556 * 1000;
            UnitTypes.gamma.abilities.get(0).percentAmount = 0.0834 * 1000;
        }

        Vars.ui.showInfoToast("Semua block termasuk sandbox telah dibuka!", 5);
    });
});
